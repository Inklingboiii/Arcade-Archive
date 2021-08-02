import React from 'react';
import headerStyles from './header.module.css';

export default function Header({ title }) {
	return(
		<header className={headerStyles.header}>
			<h1 className={headerStyles.title}>{ title }</h1>
		</header>
		);
}