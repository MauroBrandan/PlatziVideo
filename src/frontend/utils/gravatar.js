import md5 from 'md5'

const gravatar = (email) => {
	const url = 'https://gravatar.com/avatar/'
	const formattedEmail = email.trim().toLowerCase()
	const hash = md5(formattedEmail, { encoding: 'binary' })

	return `${url}${hash}`
}

export default gravatar
