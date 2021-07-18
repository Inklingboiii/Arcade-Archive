import React from 'react';
import NavBar from '../../NavBar/NavBar.jsx';
import Header from '../../Header/Header.jsx';
import Main from './Main/Main.jsx';

export default function Home() {
	return(
		<>
			<Header title="Arcade Archive" />
			<Main />
		</>
	);
}