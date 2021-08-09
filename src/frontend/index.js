import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import reducer from './reducers'
import App from './routes/App'
import initialState from './initialState'

const history = createBrowserHistory()
const container = document.getElementById('app')
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, initialState, composeEnhancers())

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<App />
		</Router>
	</Provider>,
	container
)
