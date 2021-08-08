import express from 'express'
import dotenv from 'dotenv'

const app = express()

dotenv.config()
const { ENV, PORT } = process.env

if (ENV === 'development') {
	console.log('Development config')
}

app.get('*', (req, res) => {
	res.send({ hello: 'Hello World' })
})

app.listen(PORT, (err) => {
	err ? console.log(err) : console.log(`Server running on http://localhost:${PORT}`)
})
