import React from 'react'
import { Link } from 'react-router-dom'

import '../assets/styles/containers/NotFound.scss'

const NotFound = () => {
	return (
		<section className='NotFound'>
			<h2 className='NotFound__number'>404</h2>
			<h2 className='NotFound__title'>Page Not Found</h2>
			<Link to='/' className='NotFound__button'>
				Regresa al Home
			</Link>
		</section>
	)
}

export default NotFound
