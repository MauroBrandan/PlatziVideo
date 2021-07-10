import React from 'react'
import { Link } from 'react-router-dom'

import '../assets/styles/components/Footer.scss'

const Footer = () => (
	<footer className='footer'>
		<div className='footer__links'>
			<Link to='/'>Terminos de uso</Link>
			<Link to='/'>Declaración de privacidad</Link>
			<Link to='/'>Centro de ayuda</Link>
		</div>
	</footer>
)

export default Footer
