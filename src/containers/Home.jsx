import React, { useState, useEffect } from 'react'

import '../assets/styles/containers/Home.scss'

import Header from '../components/Header'
import Search from '../components/Search'
import Carousel from '../components/Carousel'
import CarouselItem from '../components/CarouselItem'
import Footer from '../components/Footer'
import useInitialState from '../hooks/useInitialState'

const API = 'http://localhost:3000/initialState'

const Home = () => {
	const initialState = useInitialState(API)

	return (
		<section className='home'>
			<Header />

			<section className='home__search'>
				<Search />
			</section>

			<section className='home__carousels'>
				{initialState.mylist.length > 0 && (
					<>
						<h2>Mi Lista</h2>
						<Carousel>
							{initialState.mylist.map((item) => (
								<CarouselItem key={item.id} {...item} />
							))}
						</Carousel>
					</>
				)}

				<h2>Tendencias</h2>
				<Carousel>
					{initialState.trends.map((item) => (
						<CarouselItem key={item.id} {...item} />
					))}
				</Carousel>

				<h2>Platzi Originals</h2>
				<Carousel>
					{initialState.originals.map((item) => (
						<CarouselItem key={item.id} {...item} />
					))}
				</Carousel>
			</section>

			<Footer />
		</section>
	)
}

export default Home
