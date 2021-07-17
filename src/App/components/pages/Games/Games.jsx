import React from 'react';
import NavBar from '../../NavBar/NavBar.jsx';
import Header from '../../Header/Header.jsx';

export default function Home() {
	return(
		<>
			<NavBar page={1}/>
			<Header title="Games"/>
		</>
	);
}