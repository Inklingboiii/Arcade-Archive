import React, { useEffect, useRef } from 'react';
import Three from '../Three.js';
import GameOfLife from './GameOfLife.js';
import backgroundStyles from './background.module.css';

export default function Background() {
	const canvasReference = useRef();
	useEffect(() => {
		const three = new Three(canvasReference.current);
		// Stop if WebGL isn't available
		if(!three.isWebGLAvailable) return;
		const gameOfLife = new GameOfLife(three, 5, 5, 5);
		gameOfLife.start();
		// Move camera, when page is scrolled 
		document.body.onscroll = gameOfLife.moveCamera;
	}, []);
	return(
		<canvas
		className={backgroundStyles.background}
		ref={canvasReference}
		>
		A simulation of conways game of life as background
		</canvas>
	);
}