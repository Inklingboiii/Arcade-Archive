import React, { useState } from 'react';
import carouselStyles from './carousel.module.css';

export default function Carousel({ data }) {
	const [cardId, cardIdSetter] = useState(0);
	const [direction, directionSetter] = useState(-1) // -1 == right, 1 === left

	function decrementCardId() {
		if(cardId > 0) // Check if there's A card to the left
			cardIdSetter((cardId) => cardId - 1);
		else
			cardIdSetter(data.games.length - 1)
		directionSetter(1);
	}

	function incrementCardId() {
		if(cardId < data.games.length - 1) // Check if there's A card to the right
			cardIdSetter((cardId) => cardId + 1);
		else 
			cardIdSetter(0);
		directionSetter(-1)
	}

	function getClasses(gameId) {
		let isCurrentCard  = gameId === cardId + direction;
		const isNextCard = gameId === cardId;

		if(direction < 0) { // Right
			// Reset current card back to the left
			if(gameId - direction > data.games.length - 1)
				isCurrentCard = cardId === 0;
			if(isNextCard)
				return carouselStyles.cardUpAppear;
			if(isCurrentCard)
				return carouselStyles.cardDownDisappear;
		} else { // Left
			// Reset current card back to the right
			if(gameId - direction < 0)
				isCurrentCard = cardId === data.games.length - 1;
			if(isNextCard)
				return carouselStyles.cardDownAppear;
			if(isCurrentCard)
				return carouselStyles.cardUpDisappear;
		}
		return '';
	}
	return(

		<main className={carouselStyles.main}>
			<button className="btn btnSecondary" onClick={decrementCardId}>last</button>
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
								<a href={game.url} className={`btn btnPrimary ${carouselStyles.cardLink}`}>Link to game</a>
							</li>
							)
						})
					}
				</ul>
			<button className="btn btnSecondary" onClick={incrementCardId}>next</button>
		</main>
	);
}