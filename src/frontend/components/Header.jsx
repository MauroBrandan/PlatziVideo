import React from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { logoutRequest } from '../actions'
import gravatar from '../utils/gravatar'

import platziLogo from '../assets/static/platzi-logo.png'
import userIcon from '../assets/static/user-icon.png'

import '../assets/styles/components/Header.scss'

const Header = ({ user, logoutRequest }) => {
	const hasUser = Object.keys(user).length > 0

	const handleLogout = () => {
		document.cookie = 'email='
		document.cookie = 'name='
		document.cookie = 'id='
		document.cookie = 'token='
		logoutRequest({})
		window.location.href = '/login'
	}

	const headerClass =
		useLocation().pathname === '/register' ||
		useLocation().pathname === '/login' ||
		!hasUser
			? false
			: true

	return (
		<header className={headerClass ? 'header' : 'header secondary'}>
			<Link to='/'>
				<img src={platziLogo} alt='Platzi Logo' className='header__img' />
			</Link>
			<div className='header__menu'>
				<div className='header__menu--profile'>
					{hasUser ? (
						<img src={gravatar(user.email)} alt={user.email} />
					) : (
						<img src={userIcon} alt='User' />
					)}
					<p>Perfil</p>
				</div>
				<ul>
					{hasUser && <li>¡Hola {user.name}!</li>}
					<li>
						<Link to='/'>Cuenta</Link>
					</li>
					<li>
						{hasUser ? (
							<Link to='/login' onClick={handleLogout}>
								Cerrar Sesión
							</Link>
						) : (
							<Link to='/login'>Iniciar Sesión</Link>
						)}
					</li>
				</ul>
			</div>
		</header>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
	}
}

const mapDispatchToProps = {
	logoutRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
