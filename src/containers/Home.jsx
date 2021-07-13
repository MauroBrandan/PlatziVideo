import React from 'react'
import { connect } from 'react-redux'

import '../assets/styles/containers/Home.scss'

import Search from '../components/Search'
import Carousel from '../components/Carousel'
import CarouselItem from '../components/CarouselItem'
import useInitialState from '../hooks/useInitialState'

// const API = 'http://localhost:3000/initialState'

const Home = ({ mylist, trends, originals }) => {
	// const initialState = useInitialState(API)

	return (
		<section className='home'>
			<section className='home__search'>
				<Search />
			</section>

			<section className='home__carousels'>
				{mylist.length > 0 && (
					<>
						<h2>Mi Lista</h2>
						<Carousel>
							{mylist.map((item) => (
								<CarouselItem key={item.id} {...item} />
							))}
						</Carousel>
					</>
				)}

				<h2>Tendencias</h2>
				<Carousel>
					{trends.map((item) => (
						<CarouselItem key={item.id} {...item} />
					))}
				</Carousel>

				<h2>Platzi Originals</h2>
				<Carousel>
					{originals.map((item) => (
						<CarouselItem key={item.id} {...item} />
					))}
				</Carousel>
			</section>
		</section>
	)
}

const mapStateToProps = (state) => {
	return {
		mylist: state.mylist,
		trends: state.trends,
		originals: state.originals,
	}
}

export default connect(mapStateToProps, null)(Home)
