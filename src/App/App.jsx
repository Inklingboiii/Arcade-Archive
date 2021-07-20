import React, { lazy } from 'react';
import {
 Route,
 Switch
} from 'react-router-dom';
import Background from './components/Background/Background.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import Home from './components/pages/Home/Home.jsx';
import Games from './components/pages/Games/Games.jsx';
import './App.css';
export default function App() {
	return (
		<>
			<Background />
			<NavBar />
			<Switch>
				<Route exact path="/" component={ Home } />
				<Route path="/games" component={ Games } />
			</Switch>
		</>
	);
}