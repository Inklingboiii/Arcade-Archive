import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar({ page }) {
	const [navToggle, setNavToggle] = useState(false);
 	return(
		<nav className='nav'>
			<button type="button" onClick={() => setNavToggle(!navToggle)} className='nav__toggler'>
			{
				navToggle ? 'UnToggle'
				: 'Toggle'
			}
			</button>
			<article className={`nav__content ${navToggle ? 'nav__content--active' : 'nav__content--inactive'}`}>
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
			</article>
		</nav>
	);
}