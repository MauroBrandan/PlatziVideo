import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchRequest } from '../actions'

import '../assets/styles/components/Search.scss'
import playIcon from '../assets/static/play-icon.png'

const Search = (props) => {
	const [showResults, setShowResults] = useState(false)

	const handleClick = () => {
		setShowResults(!showResults)
	}

	const [query, setQuery] = useState('')

	return (
		<section className='search'>
			<h2>¿Qué quieres ver hoy?</h2>
			<input
				className={showResults ? 'search__input show-results' : 'search__input'}
				type='text'
				placeholder='Buscar...'
				onClick={handleClick}
				onChange={(e) => {
					setQuery(e.target.value)
					props.searchRequest(query)
				}}
			/>

			<div className='search-results'>
				{props.search.map((item) => (
					<div key={item.id} className='search-results__item'>
						<Link to={`/player/${item.id}`}>
							<p>{item.title}</p>
							<div>
								<img
									src={playIcon}
									alt='Play'
									className='carousel-item__details--icon'
								/>
							</div>
						</Link>
					</div>
				))}
			</div>
		</section>
	)
}

const mapStateToProps = (state) => {
	return {
		search: state.search,
	}
}

const mapDispatchToProps = {
	searchRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
