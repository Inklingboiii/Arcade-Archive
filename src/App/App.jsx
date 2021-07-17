import React from 'react';
import {
 BrowserRouter as Router ,
 Route,
 Switch
} from 'react-router-dom';
import Background from './components/Background/Background.jsx'
import Home from './components/pages/Home/Home.jsx';
import Games from './components/pages/Games/Games.jsx';
import './App.css';
export default function App() {
	return (
		<>
			<Background />
			<Router>
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/games">
						<Games />
					</Route>
				</Switch>
			</Router>
		</>
	);
}