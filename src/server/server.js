import express from 'express'
import dotenv from 'dotenv'
import webpack from 'webpack'

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
}

app.get('*', (req, res) => {
	res.send({ hello: 'Hello World' })
})

app.listen(PORT, (err) => {
	err ? console.log(err) : console.log(`Server running on http://localhost:${PORT}`)
})
