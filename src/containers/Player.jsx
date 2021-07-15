import React from 'react'

import '../assets/styles/containers/Player.scss'

const Player = (props) => {
	const { id } = props.match.params

	return (
		<section className='Player'>
			<video controls autoPlay>
				<source src='' type='video/mp4' />
			</video>

			<div className='Player-back'>
				<button type='button' onClick={() => props.history.push('/')}>
					Regresar
				</button>
			</div>
		</section>
	)
}

export default Player
