import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getVideoSource } from '../actions'
import NotFound from '../containers/NotFound'

import '../assets/styles/containers/Player.scss'

import Loader from '../components/Loader'

const Player = (props) => {
	const { id } = props.match.params
	const [loading, setLoading] = useState(true)
	const hasPlaying = Object.keys(props.playing).length > 0

	useEffect(() => {
		props.getVideoSource(id)
		setLoading(false)
	}, [])

	if (loading) {
		return <Loader />
	}

	return hasPlaying ? (
		<section className='Player'>
			<video controls autoPlay>
				<source src={props.playing.source} type='video/mp4' />
			</video>

			<div className='Player-back'>
				<button type='button' onClick={() => props.history.push('/')}>
					Regresar
				</button>
			</div>
		</section>
	) : (
		<NotFound />
	)
}

const mapStateToProps = (state) => {
	return {
		playing: state.playing,
	}
}

const mapDispatchToProps = {
	getVideoSource,
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
