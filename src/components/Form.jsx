import React from 'react'
import { Link } from 'react-router-dom'

import googleIcon from '../assets/static/google-icon.png'
import twitterIcon from '../assets/static/twitter-icon.png'

import '../assets/styles/components/Form.scss'

const Form = (props) => {
	const page = props.page === 'login' ? true : false

	return (
		<section className='form'>
			<h2>{page ? 'Iniciar Sesión' : 'Regístrate'}</h2>

			<form className='form__container'>
				{page ? '' : <input type='text' placeholder='Nombre' />}
				<input type='text' placeholder='Correo' />
				<input type='password' placeholder='Contraseña' />
				<button>{page ? 'Iniciar Sesión' : 'Registrarme'}</button>
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

export default Form
