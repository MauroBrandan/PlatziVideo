import React from 'react'

import '../assets/styles/components/Carousel.scss'
import playIcon from '../assets/static/play-icon.png'
import plusIcon from '../assets/static/plus-icon.png'

const Carousel = () => {
	return (
		<section className='carousel'>
			<div className='carousel__container'>
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
			</div>
		</section>
	)
}

export default Carousel
