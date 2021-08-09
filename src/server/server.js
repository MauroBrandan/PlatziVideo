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
	res.send(`
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
			<link rel="stylesheet" href="assets/app.css" type="text/css">
			<title>Platzi Video</title>
		</head>
		<body>
			<div id="app"></div>
			<script src="assets/app.js" type="text/javascript"></script>
		</body>
	</html>
	`)
})

app.listen(PORT, (err) => {
	err ? console.log(err) : console.log(`Server running on http://localhost:${PORT}`)
})
