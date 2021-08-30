import { setFavorite, loginRequest, getVideoSource } from '../../actions'
import movieMock from '../../__mocks__/movieMock'

describe('Actions', () => {
	test('Set favorite', () => {
		const payload = movieMock
		const expectedAction = {
			type: 'SET_FAVORITE',
			payload,
		}
		expect(setFavorite(payload)).toEqual(expectedAction)
	})

	test('Login', () => {
		const payload = {
			email: 'test@test.com',
			password: 'password',
		}
		const expectedAction = {
			type: 'LOGIN_REQUEST',
			payload,
		}
		expect(loginRequest(payload)).toEqual(expectedAction)
	})

	test('Get Video Source', () => {
		const payload = movieMock.id
		const expectedAction = {
			type: 'GET_VIDEO_SOURCE',
			payload,
		}
		expect(getVideoSource(payload)).toEqual(expectedAction)
	})
})
