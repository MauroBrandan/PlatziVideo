import React from 'react'

import playIcon from '../assets/static/play-icon.png'
import plusIcon from '../assets/static/plus-icon.png'

const CarouselItem = ({ cover, title, year, contentRating, duration }) => {
	return (
		<div className='carousel-item'>
			<img src={cover} alt={title} className='carousel-item__img' />
			<div className='carousel-item__details'>
				<div>
					<img
						src={playIcon}
						alt='Play'
						className='carousel-item__details--icon'
					/>
					<img
						src={plusIcon}
						alt='Añadir'
						className='carousel-item__details--icon'
					/>
				</div>
				<p className='carousel-item__details--info'>{title}</p>
				<p className='carousel-item__details--info'>
					{year} {contentRating} {duration} minutos
				</p>
			</div>
		</div>
	)
}

export default CarouselItem
