import React from 'react'

import '../assets/styles/app.css'

import Header from '../components/Header'
import Search from '../components/Search'
import Carousel from '../components/Carousel'
import Form from '../components/Form'

const app = () => {
	return (
		<div>
			<Form page={'register'} />
		</div>
	)
}

export default app
