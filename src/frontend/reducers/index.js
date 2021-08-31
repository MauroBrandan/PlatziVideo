import { actions } from '../actions'

const reducer = (state, action) => {
	switch (action.type) {
		case actions.setFavorite:
			return {
				...state,
				mylist: state.mylist.some((items) => items.id === action.payload.id)
					? [...state.mylist]
					: [...state.mylist, action.payload],
			}

		case actions.deleteFavorite:
			return {
				...state,
				mylist: state.mylist.filter((item) => item.id !== action.payload),
			}

		case actions.loginRequest:
			return {
				...state,
				user: action.payload,
			}

		case actions.logoutRequest:
			return {
				...state,
				user: action.payload,
			}

		case actions.getVideoSource:
			return {
				...state,
				playing:
					state.trends.find((item) => item.id === action.payload) ||
					state.originals.find((item) => item.id === action.payload) ||
					[],
			}

		case actions.searchRequest:
			const allVideos = state.trends.concat(state.originals)
			return {
				...state,
				search:
					allVideos.filter((item) =>
						item.title.toLowerCase().includes(action.payload.toLowerCase())
					) || [],
			}

		default:
			return state
	}
}

export default reducer
