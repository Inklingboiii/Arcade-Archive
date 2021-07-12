import React from 'react';
import NavBar from './NavBar/NavBar.jsx';
import './Header.css';

export default function Header({ page, title }) {
	return(
		<header className="header">
			<NavBar page={page}/>
			<h1 className="header__title">{ title }</h1>
		</header>
		);
}