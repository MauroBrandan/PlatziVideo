const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const boom = require('@hapi/boom')
const axios = require('axios')
require('dotenv').config()
const { API_URL, API_KEY_TOKEN } = process.env

passport.use(
	new BasicStrategy(async function (email, password, cb) {
		try {
			const { data, status } = await axios({
				url: `${API_URL}/api/auth/sign-in`,
				method: 'post',
				auth: {
					password,
					username: email,
				},
				data: {
					apiKeyToken: API_KEY_TOKEN,
				},
			})

			if (!data || status !== 200) {
				return cb(boom.unauthorized(), false)
			}

			return cb(null, data)
		} catch (error) {
			cb(error)
		}
	})
)
