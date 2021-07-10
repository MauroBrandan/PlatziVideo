import React from 'react'

import '../assets/styles/containers/NotFound.scss'

const NotFound = () => {
	return (
		<section className='NotFound'>
			<h2 className='NotFound__number'>404</h2>
			<h2 className='NotFound__title'>Page Not Found</h2>
			<a href='/' className='NotFound__button'>
				Regresa al Home
			</a>
		</section>
	)
}

export default NotFound
