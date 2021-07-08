import React from 'react'

import '../assets/styles/containers/Home.scss'

import Header from '../components/Header'
import Search from '../components/Search'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'

const Home = () => {
	return (
		<section className='home'>
			<Header />
			<section className='home__search'>
				<Search />
			</section>
			<section className='home__carousels'>
				<h2>Mi lista</h2>
				<Carousel />
				<h2>Platzi Originals</h2>
				<Carousel />
			</section>
			<Footer />
		</section>
	)
}

export default Home
