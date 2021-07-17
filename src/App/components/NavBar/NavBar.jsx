import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar({ page }) {
	const [navToggle, setNavToggle] = useState(false);
 	return(
		<nav className='nav'>
			<button type="button" onClick={() => setNavToggle(!navToggle)} className='nav__toggler'>
				<p className="visually-hidden">{navToggle ? 'Close navigation bar' : 'Open navigation bar'}</p>
			{
				navToggle ?
				 <svg className="nav__svg" viewBox="0 0 100 40" preserveAspectRatio="xMinYMax meet" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<line y1="20" y2="20" x1="30" x2="100" strokeWidth="10" />
					<line y1="40" y2="20" x1="60" x2="30" strokeWidth="10" />
					<line y1="0" y2="20" x1="60" x2="30" strokeWidth="10" />
				 </svg>
				: <svg className="nav__svg" viewBox="0 -10 100 60"preserveAspectRatio="xMinYMax meet" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<line y1="0" y2="0" x1="0" x2="100" strokeWidth="10" />
					<line y1="20" y2="20" x1="0" x2="100" strokeWidth="10" />
					<line y1="40" y2="40" x1="0" x2="100" strokeWidth="10" />
				</svg>
			}
			</button>
			<article className={`nav__content ${navToggle ? 'nav__content--active' : 'nav__content--inactive'}`}>
				<a href="#" role="logo" className="nav__logo">Arcade Archive</a>
				<ul className="nav__list">
					<li>
						<Link to="./" className={page === 0 ? 'nav__link nav__link--active' : 'nav__link'}>Home</Link>
					</li>
					<li>
						<Link to="/games" className={page === 1 ? 'nav__link nav__link--active' : 'nav__link'}>Games</Link>
					</li>
					<li>
						<Link to="/planned-games" className={page === 2 ? 'nav__link nav__link--active' : 'nav__link'}>Planned Games</Link>
					</li>
				</ul>
			</article>
		</nav>
	);
}