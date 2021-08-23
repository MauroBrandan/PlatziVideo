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
			.catch((error) => console.error(error))
	}
}
