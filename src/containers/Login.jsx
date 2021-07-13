import React from 'react'

import '../assets/styles/containers/Login.scss'

import Form from '../components/Form.jsx'

const Login = (props) => {
	const historyBrowser = props.history
	return (
		<section className='Login'>
			<Form page='login' history={historyBrowser} />
		</section>
	)
}

export default Login
