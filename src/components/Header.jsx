import React from 'react'

import platziLogo from '../assets/static/platzi-logo.png'
import userIcon from '../assets/static/user-icon.png'

import '../assets/styles/components/Header.scss'

const Header = () => {
	return (
		<header className='header'>
			<img src={platziLogo} alt='Platzi Logo' className='header__img' />
			<div className='header__menu'>
				<div className='header__menu--profile'>
					<img src={userIcon} alt='User' />
					<p>Perfil</p>
				</div>
				<ul>
					<li>
						<a href='/'>Cuenta</a>
					</li>
					<li>
						<a href='/'>Cerrar Sesión</a>
					</li>
				</ul>
			</div>
		</header>
	)
}

export default Header
