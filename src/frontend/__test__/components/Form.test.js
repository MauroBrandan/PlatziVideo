import React from 'react'
import { mount } from 'enzyme'
import Form from '../../components/Form'
import ProviderMock from '../../__mocks__/ProviderMock'

describe('<Form />', () => {
	test('Form submit', () => {
		const preventDefault = jest.fn()
		const form = mount(
			<ProviderMock>
				<Form />
			</ProviderMock>
		)
		form.find('form').simulate('submit', { preventDefault })
		expect(preventDefault).toHaveBeenCalledTimes(1)
		form.unmount()
	})
})
