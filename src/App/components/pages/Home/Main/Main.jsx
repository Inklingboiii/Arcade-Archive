import React from 'react';
import { Link } from 'react-router-dom';
import './Main.css'

export default function Main() {
	return(
		<main className="main">
			<p className="main__text">Hi! This website is a collection of all the javascript games i created<span className="dot">.</span></p>
			<Link to="/games" className="btn main__button"> Would you like to play them?</Link>
		</main>
	);
}