import gravatar from '../../utils/gravatar'

test('Gravatar Function test', () => {
	const email = 'maurobrandan.mb@gmail.com'
	const gravatarUrl = 'https://gravatar.com/avatar/f4d1d37e9c07d4413eedf8904c6bb665'
	expect(gravatarUrl).toEqual(gravatar(email))
})
