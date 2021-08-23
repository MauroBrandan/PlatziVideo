import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { registerUser } from '../actions'

import googleIcon from '../assets/static/google-icon.png'
import twitterIcon from '../assets/static/twitter-icon.png'

import '../assets/styles/components/Form.scss'

const Form = (props) => {
	const page = props.page === 'login' ? true : false

	const [form, setForm] = useState(props.formState)

	const handleInput = (event) => {
		setForm({
			...form,
			[event.target.name]: event.target.value,
		})
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		props.registerUser(form, '/login')
	}

	return (
		<section className='form'>
			<h2>{page ? 'Iniciar Sesión' : 'Regístrate'}</h2>

			<form className='form__container' onSubmit={handleSubmit}>
				{page ? (
					''
				) : (
					<input
						name='name'
						type='text'
						placeholder='Nombre'
						onChange={handleInput}
					/>
				)}

				<input
					name='email'
					type='text'
					placeholder='Correo'
					onChange={handleInput}
				/>

				<input
					name='password'
					type='password'
					placeholder='Contraseña'
					onChange={handleInput}
				/>

				<button type='submit'>{page ? 'Iniciar Sesión' : 'Registrarme'}</button>

				{page ? (
					<div className='form__container-label'>
						<label>
							<input type='checkbox' /> Recuerdame
						</label>
						<Link to='/'>Olvidé mi contraseña</Link>
					</div>
				) : (
					''
				)}
			</form>

			<div className='form__social-media'>
				<div className='form__social-media-container'>
					<img src={googleIcon} alt='Google' />
					<Link to='/'>Inicia sesión con Google</Link>
				</div>
				<div className='form__social-media-container'>
					<img src={twitterIcon} alt='Twitter' />
					<Link to='/'>Inicia sesión con Twitter</Link>
				</div>
			</div>

			{page ? (
				<p>
					¿No tienes ninguna cuenta? <Link to='/register'>Regístrate</Link>
				</p>
			) : (
				<Link to='/login'>Iniciar Sesión</Link>
			)}
		</section>
	)
}

const mapDispatchToProps = {
	registerUser,
}

export default connect(null, mapDispatchToProps)(Form)
