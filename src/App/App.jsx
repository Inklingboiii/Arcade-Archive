import React from 'react';
import {
 BrowserRouter as Router ,
 Route,
 Switch
} from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import './App.css';
export default function App() {
	return (
		<Router>
			<Switch>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</Router>
		)
}