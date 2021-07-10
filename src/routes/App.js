import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import '../assets/styles/app.css'

import Home from '../containers/Home'

const App = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={Home} />
			<Route exact path='/login' component={Login} />
			<Route exact path='/register' component={Register} />
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>
)

export default App
