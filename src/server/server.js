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

import serverRoutes from '../frontend/routes/serverRoutes'
import reducer from '../frontend/reducers'
import initialState from '../frontend/initialState'
import Layout from '../frontend/components/Layout'
import getManifest from './getManifest'

const app = express()

dotenv.config()
const { ENV, PORT } = process.env

if (ENV === 'development') {
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

const renderApp = (req, res) => {
	const store = createStore(reducer, initialState)
	const preloadedState = store.getState()
	const html = renderToString(
		<Provider store={store}>
			<StaticRouter location={req.url} context={{}}>
				<Layout>{renderRoutes(serverRoutes)}</Layout>
			</StaticRouter>
		</Provider>
	)

	res.send(setResponse(html, preloadedState, req.hashManifest))
}

const setResponse = (html, preloadedState, manifest) => {
	const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js'
	const mainStyles = manifest ? manifest['main.css'] : 'assets/app.css'

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
				<script src="${mainBuild}" type="text/javascript"></script>
			</body>
		</html>
		`
}

app.get('*', renderApp)

app.listen(PORT, (err) => {
	err ? console.log(err) : console.log(`Server running on port ${PORT}`)
})
