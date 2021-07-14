import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import gravatar from '../utils/gravatar'

import platziLogo from '../assets/static/platzi-logo.png'
import userIcon from '../assets/static/user-icon.png'

import '../assets/styles/components/Header.scss'

const Header = ({ user }) => {
	const hasUser = Object.keys(user).length > 0

	return (
		<header className='header'>
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
					<li>
						<Link to='/'>Cuenta</Link>
					</li>
					<li>
						<Link to='/login'>{hasUser ? 'Cerrar Sesión' : 'Iniciar Sesión'}</Link>
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

export default connect(mapStateToProps, null)(Header)
