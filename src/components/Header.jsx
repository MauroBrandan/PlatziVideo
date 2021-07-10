import React from 'react'
import { Link } from 'react-router-dom'

import platziLogo from '../assets/static/platzi-logo.png'
import userIcon from '../assets/static/user-icon.png'

import '../assets/styles/components/Header.scss'

const Header = () => {
	return (
		<header className='header'>
			<Link to='/'>
				<img src={platziLogo} alt='Platzi Logo' className='header__img' />
			</Link>
			<div className='header__menu'>
				<div className='header__menu--profile'>
					<img src={userIcon} alt='User' />
					<p>Perfil</p>
				</div>
				<ul>
					<li>
						<Link to='/'>Cuenta</Link>
					</li>
					<li>
						<Link to='/login'>Iniciar Sesión</Link>
					</li>
				</ul>
			</div>
		</header>
	)
}

export default Header
