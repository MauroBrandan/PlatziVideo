import express from 'express'
import dotenv from 'dotenv'
import webpack from 'webpack'
import helmet from 'helmet'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { StaticRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import passport from 'passport'
import axios from 'axios'
import boom from '@hapi/boom'
import cookieParser from 'cookie-parser'

import serverRoutes from '../frontend/routes/serverRoutes'
import reducer from '../frontend/reducers'
import Layout from '../frontend/components/Layout'
import getManifest from './getManifest'

require('./utils/auth/strategies/basic')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

dotenv.config()
const { ENV, PORT, API_URL } = process.env

const dev = ENV === 'development'

if (dev) {
	console.log('Development config')

	const webpackConfig = require('../../webpack.config')
	const webpackDevMiddleware = require('webpack-dev-middleware')
	const webpackHotMiddleware = require('webpack-hot-middleware')

	const { publicPath } = webpackConfig.output
	const compiler = webpack(webpackConfig)
	const serverConfig = { serverSideRender: true, publicPath }

	app.use(webpackDevMiddleware(compiler, serverConfig))
	app.use(webpackHotMiddleware(compiler))
} else {
	app.use((req, res, next) => {
		if (!req.hashManifest) req.hashManifest = getManifest()
		next()
	})
	app.use(express.static(`${__dirname}/public`))
	app.use(helmet())
	app.use(helmet.permittedCrossDomainPolicies())
	app.disable('x-powered-by')
}

const renderApp = async (req, res) => {
	let initialState
	const { token, email, name, id } = req.cookies

	try {
		let moviesList = await axios({
			url: `${API_URL}/api/movies`,
			headers: { Authorization: `Bearer ${token}` },
			method: 'get'
		})
		moviesList = moviesList.data.data

		let userMoviesList = await axios({
			url: `${API_URL}/api/user-movies/?userId=${id}`,
			headers: { Authorization: `Bearer ${token}` },
			method: 'get',
		})
		userMoviesList = userMoviesList.data.data

		initialState = {
			user: {
			  email, name, id
			},
			playing: {},
			search: [],
			mylist: moviesList.filter(movie => userMoviesList.some( userMovie => movie._id === userMovie.movieId)).map( movie => {
				const filteredMovie = userMoviesList.find(userMovie => movie._id === userMovie.movieId)
				if (filteredMovie) {
				  movie.userMovieId = filteredMovie._id
				}
				return movie
			  	}
			),
			trends: moviesList.filter(movie => movie.contentRating === 'PG' && movie._id),
			originals: moviesList.filter(movie => movie.contentRating != 'PG' && movie._id),
		}
	} catch (err) {
		initialState = {
			user: {},
			playing: {},
			search: [],
			mylist: [],
			trends: [],
			originals: []
		}
	}

	const store = createStore(reducer, initialState)
	const preloadedState = store.getState()
	const isLogged = (initialState.user.id)
	const html = renderToString(
		<Provider store={store}>
			<StaticRouter location={req.url} context={{}}>
				<Layout>{renderRoutes(serverRoutes(isLogged))}</Layout>
			</StaticRouter>
		</Provider>
	)

	res.send(setResponse(html, preloadedState, req.hashManifest))
}

const setResponse = (html, preloadedState, manifest) => {
	const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js'
	const mainStyles = manifest ? manifest['vendors.css'] : 'assets/app.css'
	const vendorBuild = manifest ? manifest['vendors.js'] : 'assets/vendor.js'

	return `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
				<link
					href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;500;700&display=swap"
					rel="stylesheet"
				/>
				<link rel="stylesheet" href="${mainStyles}" type="text/css">
				<title>Platzi Video</title>
			</head>
			<body>
				<div id="app">${html}</div>
				<script>
        			window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
								/</g,
								'\\u003c'
							)}
      			</script>
				<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
				<script src="${mainBuild}" type="text/javascript"></script>
				<script src="${vendorBuild}" type="text/javascript"></script>
			</body>
		</html>
		`
}

app.post('/auth/sign-in', async function (req, res, next) {
	passport.authenticate('basic', function (error, data) {
		try {
			if (error || !data) {
				next(boom.unauthorized())
			}

			req.login(data, { session: false }, async function (err) {
				if (err) {
					next(err)
				}

				const { token, ...user } = data

				res.cookie('token', token, {
					httpOnly: !dev,
					secure: !dev,
				})

				res.status(200).json(user)
			})
		} catch (error) {
			next(error)
		}
	})(req, res, next)
})

app.post('/auth/sign-up', async function (req, res, next) {
	const { body: user } = req

	try {
		const userData = await axios({
			url: `${API_URL}/api/auth/sign-up`,
			method: 'post',
			data: {
				'email': user.email,
				'name': user.name,
				'password': user.password,
			},
		})

		res.status(201).json({
			name: req.body.name,
			email: req.body.email,
			id: userData.data.id,
		})
	} catch (error) {
		next(error)
	}
})

app.post('/user-movies', async (req, res, next) => {
	try {
	  const { body: userMovie } = req
	  const { id, token } = req.cookies
  
	  const { data, status } = await axios({
		url: `${API_URL}/api/user-movies`,
		headers: { Authorization: `Bearer ${token}` },
		method: 'post',
		data: {
			userId: id,
			movieId: userMovie.movieId,
		}
	  })
  
	  const {
		data: { movieExist },
	  } = data
  
	  if (status !== 200 && status !== 201) {
		return next(boom.badImplementation())
	  }
  
	  const statusCode = movieExist ? 200 : 201
  
	  return res.status(statusCode).json(data)
	} catch (error) {
	  next(error)
	}
})

app.delete('/user-movies/:userMovieId', async (req, res, next) => {
	const { userMovieId } = req.params
	const { token } = req.cookies
  
	try {
	  const response = await axios({
		url: `${API_URL}/api/user-movies/${userMovieId}`,
		method: 'DELETE',
		headers: {
		  Authorization: `Bearer ${token}`,
		},
	  })
  
	  res.status(200).json(response.data)
	} catch (error) {
	  next(error)
	}
})

app.get('*', renderApp)

app.listen(PORT, (err) => {
	err ? console.log(err) : console.log(`Server running on port ${PORT}`)
})
