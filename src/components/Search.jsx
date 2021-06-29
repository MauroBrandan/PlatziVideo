import React from 'react'

import '../assets/styles/components/Search.scss'

const Search = () => {
	return (
		<section className='search'>
			<h2>¿Qué quieres ver hoy?</h2>
			<input className='search__input' type='text' placeholder='Buscar...' />
		</section>
	)
}

export default Search
