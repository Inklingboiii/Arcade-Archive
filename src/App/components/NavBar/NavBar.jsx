import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import navStyles from './navbar.module.css';

export default function NavBar({ page }) {
	const [navToggle, setNavToggle] = useState(false);
 	return(
		<nav>
			<button type="button" onClick={() => setNavToggle(!navToggle)} className={navStyles.toggler}>
				<p className="visually-hidden">{navToggle ? 'Close navigation bar' : 'Open navigation bar'}</p>
			{
				navToggle ?
				 <svg className={navStyles.svg} viewBox="0 0 100 40" preserveAspectRatio="xMinYMax meet" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<line y1="20" y2="20" x1="30" x2="100" strokeWidth="10" />
					<line y1="40" y2="20" x1="60" x2="30" strokeWidth="10" />
					<line y1="0" y2="20" x1="60" x2="30" strokeWidth="10" />
				 </svg>
				: <svg className={navStyles.svg} viewBox="0 -10 100 60"preserveAspectRatio="xMinYMax meet" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<line y1="0" y2="0" x1="0" x2="100" strokeWidth="10" />
					<line y1="20" y2="20" x1="0" x2="100" strokeWidth="10" />
					<line y1="40" y2="40" x1="0" x2="100" strokeWidth="10" />
				</svg>
			}
			</button>
			<article className={`${navStyles.content} ${navToggle ? navStyles.contentActive : ''}`}>
				<a href="#" className={navStyles.logo}>Arcade Archive</a>
				<ul className={navStyles.list}>
				{
					[
						{
							content: 'Home',
							path: '/'
						},
						{
							content: 'Games',
							path: '/games'
						},
						{
							content: 'Planned Games',
							path: '/planned-games'
						}
					].map((page) => {
						return(
							<li key={page.content}> 
								<NavLink exact to={page.path} className={navStyles.link} activeClassName={navStyles.linkActive}>{page.content}</NavLink>
							</li>
						);
					})
				}
				</ul>
			</article>
		</nav>
	);
}