import React from 'react'

import googleIcon from '../assets/static/google-icon.png'
import twitterIcon from '../assets/static/twitter-icon.png'

import '../assets/styles/components/Form.scss'

const Form = () => {
	return (
		<section className='form'>
			<h2>Inicia Sesión</h2>

			<form className='form__container'>
				<input type='text' placeholder='Correo' />
				<input type='password' placeholder='Contraseña' />
				<button>Iniciar Sesión</button>
				<div className='form__container-label'>
					<label>
						<input type='checkbox' /> Recuerdame
					</label>
					<a href='/'>Olvidé mi contraseña</a>
				</div>
			</form>

			<div className='form__social-media'>
				<div className='form__social-media-container'>
					<img src={googleIcon} alt='Google' />
					Inicia sesión con Google
				</div>
				<div className='form__social-media-container'>
					<img src={twitterIcon} alt='Twitter' />
					Inicia sesión con Twitter
				</div>
			</div>

			<p>
				¿No tienes ninguna cuenta? <a href='/'>Regístrate</a>
			</p>
		</section>
	)
}

export default Form
