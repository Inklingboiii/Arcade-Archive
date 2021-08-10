import React, { useState } from 'react';
import carouselStyles from './carousel.module.css';

export default function Carousel({ data }) {
	const [cardId, cardIdSetter] = useState(0);
	const [direction, directionSetter] = useState(-1) // 1 == right, -1 === left

	function decrementCardId() {
		cardIdSetter((cardId) => cardId - 1);
		directionSetter(1);
	}

	function incrementCardId() {
		cardIdSetter((cardId) => cardId + 1);
		directionSetter(-1)
	}

	function getClasses(gameId) {
		if(direction < 0) { // Next
			if(gameId === cardId)
				return carouselStyles.cardUpAppear;
			if(gameId === cardId + direction)
				return carouselStyles.cardDownDisappear;
		} else { // Last card
			if(gameId === cardId)
				return carouselStyles.cardDownAppear;
			if(gameId === cardId + direction)
				return carouselStyles.cardUpDisappear;
		}
		return '';
	}
	return(

		<main className={carouselStyles.main}>
			<button className="btn" onClick={decrementCardId}>last</button>
				<ul className={carouselStyles.cardContainer}>
					{
						data.games.map((game) => {
							return( 
							<li key={game.id} className={
								`${carouselStyles.card} ${getClasses(game.id)}`
							}>
								<img src={game.img} alt={game.name} className={carouselStyles.cardImage}/>
								<h2>{game.name}</h2>
								<p className={carouselStyles.cardText}>{game.desc}</p>
								<a href={game.url} className={`btn ${carouselStyles.cardLink}`}>Link to game</a>
							</li>
							)
						})
					}
				</ul>
			<button className="btn" onClick={incrementCardId}>next</button>
		</main>
	);
}