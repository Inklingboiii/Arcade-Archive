import React, { useState } from 'react';
import carouselStyles from './carousel.module.css';

export default function Carousel({ data }) {
	const [cardId, cardIdSetter] = useState(0);
	const [direction, directionSetter] = useState(0) // 1 == right, -1 === left

	function decrementCardId() {
		cardIdSetter((cardId) => cardId - 1);
		directionSetter(1);
	}

	function incrementCardId() {
		cardIdSetter((cardId) => cardId + 1);
		directionSetter(-1)
	}

	function getClasses(gameId) {
		if(gameId === cardId) {
			return carouselStyles.cardUp;
		} else if(gameId === cardId + direction) {
			return carouselStyles.cardDown;
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