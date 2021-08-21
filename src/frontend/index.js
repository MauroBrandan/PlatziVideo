import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import reducer from './reducers'
import App from './routes/App'

const container = document.getElementById('app')
const history = createBrowserHistory()
const preloadedState = window.__PRELOADED_STATE__
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
	reducer,
	preloadedState,
	composeEnhancers(applyMiddleware(thunk))
)

delete window.__PRELOADED_STATE__

ReactDOM.hydrate(
	<Provider store={store}>
		<Router history={history}>
			<App />
		</Router>
	</Provider>,
	container
)
