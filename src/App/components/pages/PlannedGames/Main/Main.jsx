import React from 'react';
import data from './game-data.json';
import Carousel from '../../../Carousel/Carousel.jsx';


export default function Main() {
	return (
		<Carousel data={data}/>
	);
}