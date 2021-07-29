import React from 'react';

export default function Carousel({ data }) {
	return(

		<main>
			<button className="btn">last</button>
				<ul>
					{
						data.games.map((game, index) => {
							return( 
							<li key={index}>
								<img src={game.img} alt={game.name} />
								<h2>{game.name}</h2>
								<p>{game.desc}</p>
								<a href={game.url}>Link to game</a>
							</li>
							)
						})
					}
				</ul>
			<button className="btn">next</button>
		</main>
	);
}