import React from 'react';
import Background from '../../Background/Background.jsx';
import NavBar from '../../NavBar/NavBar.jsx';

export default function Home() {
	return(
		<>
			<Background/>
			<NavBar page={0} />
		</>
	);
}