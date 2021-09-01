import axios from 'axios'

export const actions = {
	setFavorite: 'SET_FAVORITE',
	deleteFavorite: 'DELETE_FAVORITE',
	loginRequest: 'LOGIN_REQUEST',
	logoutRequest: 'LOGOUT_REQUEST',
	getVideoSource: 'GET_VIDEO_SOURCE',
	searchRequest: 'SEARCH_REQUEST',
	registerUser: 'REGISTER_USER',
}

export const setFavorite = (payload) => ({
	type: actions.setFavorite,
	payload,
})

export const deleteFavorite = (payload) => ({
	type: actions.deleteFavorite,
	payload,
})

export const loginRequest = (payload) => ({
	type: actions.loginRequest,
	payload,
})

export const logoutRequest = (payload) => ({
	type: actions.logoutRequest,
	payload,
})

export const getVideoSource = (payload) => ({
	type: actions.getVideoSource,
	payload,
})

export const searchRequest = (payload) => ({
	type: actions.searchRequest,
	payload,
})

export const registerUser = (payload, redirectUrl) => {
	return (dispatch) => {
		axios
			.post('/auth/sign-up', payload)
			.then(({ data }) => dispatch(loginRequest(data)))
			.then(() => {
				window.location.href = redirectUrl
			})
			.catch((error) => {
				Swal.fire({
					text: 'Complete todos los campos',
					icon: 'error',
					showConfirmButton: false,
					toast: true,
					position: 'top',
					timer: 5000,
				})
			})
	}
}

export const loginUser = ({ email, password }, redirectUrl) => {
	return (dispatch) => {
		axios({
			url: '/auth/sign-in/',
			method: 'post',
			auth: {
				username: email,
				password,
			},
		})
			.then(({ data }) => {
				document.cookie = `email=${data.user.email}`
				document.cookie = `name=${data.user.name}`
				document.cookie = `id=${data.user.id}`
				dispatch(loginRequest(data.user))
			})
			.then(() => {
				window.location.href = redirectUrl
			})
			.catch((error) => {
				Swal.fire({
					text: 'Correo o contraseña incorrectos',
					icon: 'error',
					showConfirmButton: false,
					toast: true,
					position: 'top',
					timer: 5000,
				})
			})
	}
}

export const addUserMovie = ({ _id, ...movie }) => {
	const data = {
		movieId: _id,
	}

	return (dispatch) => {
		axios({
			url: '/user-movies',
			method: 'post',
			data: data,
		})
			.then(() => {
				dispatch(setFavorite(movie))
			})
			.catch((error) => console.error(error))
	}
}

export const deleteUserMovie = (userMovieId, id) => {
	if (!userMovieId) {
		return (dispatch) => dispatch(deleteFavorite(id))
	}

	return (dispatch) => {
		axios({
			url: `/user-movies/${userMovieId}`,
			method: 'delete',
		})
			.then(() => {
				dispatch(deleteFavorite(id))
			})
			.catch((error) => console.error(error))
	}
}
