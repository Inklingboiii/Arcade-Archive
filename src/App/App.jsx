import React, { useEffect } from 'react';
import {
 Route,
 Switch,
 useLocation
} from 'react-router-dom';
import Background from './components/Background/Background.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import Home from './components/pages/Home/Home.jsx';
import Games from './components/pages/Games/Games.jsx';
import PlannedGames from './components/pages/PlannedGames/PlannedGames.jsx';
import './App.css';
export default function App() {
	// Sets scrollbar to top when link changes: 
	// https://stackoverflow.com/questions/36904185/react-router-scroll-to-top-on-every-transition
	
	const { pathname } = useLocation();
  	useEffect(() => {
    	window.scrollTo(0, 0);
  	}, [pathname]);
	return (
		<>
			<Background />
			<NavBar />
			<Switch>
				<Route exact path="/" component={ Home } />
				<Route path="/games" component={ Games } />
				<Route path="/planned-games" component={ PlannedGames } />
			</Switch>
		</>
	);
}