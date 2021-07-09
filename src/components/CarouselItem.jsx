import React from 'react'

import playIcon from '../assets/static/play-icon.png'
import plusIcon from '../assets/static/plus-icon.png'

const CarouselItem = () => {
	return (
		<div className='carousel-item'>
			<img src='' alt='' className='carousel-item__img' />
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
				<p className='carousel-item__details--info'>Titulo descriptivo</p>
				<p className='carousel-item__details--info'>2019 16+ 114 minutos</p>
			</div>
		</div>
	)
}

export default CarouselItem
