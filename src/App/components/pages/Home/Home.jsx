import React from 'react';
import Header from '../../Header/Header.jsx';
import Main from './Main/Main.jsx';

export default function Home() {
	return(
		<>
			<Header page={0} title="Arcade Archive"/>
			<Main />
		</>
	);
}