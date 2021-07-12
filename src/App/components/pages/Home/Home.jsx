import React from 'react';
import Background from '../../Background/Background.jsx';
import Header from '../../Header/Header.jsx'

export default function Home() {
	return(
		<>
			<Background/>
			<Header page={0} title="Arcade Archive"/>
		</>
	);
}