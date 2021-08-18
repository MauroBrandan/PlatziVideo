import React from 'react'

import '../assets/styles/containers/Login.scss'

import Form from '../components/Form.jsx'

const Login = (props) => {
	const historyBrowser = props.history
	const loginForm = {
		email: '',
	}
	return (
		<section className='Login'>
			<Form page='login' history={historyBrowser} formState={loginForm} />
		</section>
	)
}

export default Login
