import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { mount } from 'enzyme'
import { create } from 'react-test-renderer'
import Footer from '../../components/Footer'

describe('<Footer />', () => {
	const footer = mount(
		<MemoryRouter>
			<Footer />
		</MemoryRouter>
	)

	test('Render Footer Component ', () => {
		expect(footer.length).toEqual(1)
	})

	test('Footer haves 3 anchors ', () => {
		expect(footer.find('Link')).toHaveLength(3)
	})

	test('Footer Snapshot', () => {
		const footer = create(
			<MemoryRouter>
				<Footer />
			</MemoryRouter>
		)
		expect(footer.toJSON()).toMatchSnapshot()
	})
})
