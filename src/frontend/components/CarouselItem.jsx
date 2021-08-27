import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addUserMovie, deleteUserMovie } from '../actions'

import playIcon from '../assets/static/play-icon.png'
import plusIcon from '../assets/static/plus-icon.png'
import removeIcon from '../assets/static/remove-icon.png'

const CarouselItem = (props) => {
	const {
		id,
		_id,
		cover,
		title,
		year,
		contentRating,
		duration,
		addUserMovie,
		deleteUserMovie,
		userMovieId,
		isList,
	} = props

	const handleSetFavorite = () => {
		addUserMovie({
			id,
			_id,
			cover,
			title,
			year,
			contentRating,
			duration,
		})
	}

	const handleDeleteFavorite = (userMovieId, id) => {
		deleteUserMovie(userMovieId, id)
	}

	return (
		<div className='carousel-item'>
			<img src={cover} alt={title} className='carousel-item__img' />
			<div className='carousel-item__details'>
				<div>
					<Link to={`/player/${id}`}>
						<img
							src={playIcon}
							alt='Play'
							className='carousel-item__details--icon'
						/>
					</Link>

					{isList ? (
						<img
							src={removeIcon}
							alt='Eliminar'
							className='carousel-item__details--icon'
							onClick={() => handleDeleteFavorite(userMovieId, id)}
						/>
					) : (
						<img
							src={plusIcon}
							alt='Añadir'
							className='carousel-item__details--icon'
							onClick={handleSetFavorite}
						/>
					)}
				</div>
				<p className='carousel-item__details--info'>{title}</p>
				<p className='carousel-item__details--info'>
					{year} {contentRating} {duration} minutos
				</p>
			</div>
		</div>
	)
}

const mapDispatchToProps = {
	addUserMovie,
	deleteUserMovie,
}

export default connect(null, mapDispatchToProps)(CarouselItem)
