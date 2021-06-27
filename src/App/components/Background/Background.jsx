import React, { useEffect, useRef } from 'react';
import './Background.css';
import Three from '../Three.js';
import GameOfLife from './GameOfLife.js';

export default function() {
	const canvasReference = useRef();
	useEffect(() => {
	const three = new Three(canvasReference.current);
	const gameOfLife = new GameOfLife(three, 10, 10, 10);
	gameOfLife.start();
	}, []);
	return(
		<canvas
		className="background"
		ref={canvasReference}
		/>
	)
}