import React from 'react';
import { Link } from 'react-router-dom';
import mainStyles from './main.module.css';

export default function Main() {
	return(
		<main className={mainStyles.main}>
			<p className={mainStyles.text}>Hi! This website is a collection of all the javascript games i created<span className={mainStyles.dot}>.</span></p>
			<Link to="/games" className="btn"> Would you like to play them?</Link>
		</main>
	);
}