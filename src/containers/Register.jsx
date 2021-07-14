import React from 'react'

import '../assets/styles/containers/Register.scss'

import Form from '../components/Form.jsx'

const Register = (props) => {
	const historyBrowser = props.history
	const registerForm = {
		email: '',
		name: '',
		password: '',
	}
	return (
		<section className='Register'>
			<Form page='register' history={historyBrowser} formState={registerForm} />
		</section>
	)
}

export default Register
