import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar({ page }) {
	return(
		<nav className="nav">
			<a href="#" role="logo" className="nav__logo">Arcade Archive</a>
			<ul className="nav__list">
				<li>
					<Link to="./" className={page === 0 ? 'nav__link--active' : 'nav__link'}>Home</Link>
				</li>
				<li>
					<Link to="/Games" className={page === 1 ? 'nav__link--active' : 'nav__link'}>Games</Link>
				</li>
				<li>
					<Link to="/Planned-Games" className={page === 1 ? 'nav__link--active' : 'nav__link'}>Planned Games</Link>
				</li>
			</ul>
		</nav>
	);
}