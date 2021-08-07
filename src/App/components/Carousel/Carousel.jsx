import React, { useState } from 'react';
import carouselStyles from './carousel.module.css';

export default function Carousel({ data }) {
	const [cardId, cardIdSetter] = useState(0);

	function decrementCardId() {
		cardIdSetter((cardId) => cardId - 1);
	}

	function incrementCardId() {
		cardIdSetter((cardId) => cardId + 1);
	}
	return(

		<main className={carouselStyles.main}>
			<button className="btn" onClick={decrementCardId}>last</button>
				<ul className={carouselStyles.cardContainer}>
					{
						data.games.map((game) => {
							return( 
							<li key={game.id} className={`${carouselStyles.card} ${game.id === cardId ? carouselStyles.cardActive : ''}`}>
								<img src={game.img} alt={game.name} className={carouselStyles.cardImage}/>
								<h2>{game.name}</h2>
								<p className={carouselStyles.cardText}>{game.desc}</p>
								<a href={game.url} className="btn">Link to game</a>
							</li>
							)
						})
					}
				</ul>
			<button className="btn" onClick={incrementCardId}>next</button>
		</main>
	);
}