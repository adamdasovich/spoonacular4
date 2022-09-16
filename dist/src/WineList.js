import React from 'react'

const WineList = ({ pairedWineData, mealSelection }) => {
	return (
		<main>
			<section className='wine'>
				<h3>Recommended wines to enjoy with {mealSelection} include:</h3>
				<div>
					<ul className='wineList'>
						{pairedWineData.pairedWines.map((wine) => {
							return <li key={wine}>{wine}</li>
						})}
					</ul>
					<div className='wineText'>{pairedWineData.pairingText}</div>
				</div>
				<h3>One reccomended wine is:  {pairedWineData.productMatches[0].title}</h3>
				<ul>
					<li className='wineTitle'></li>
					<li className='wineDescription'>{pairedWineData.productMatches[0].description}</li>
					<li className='winePrice'>Price: {pairedWineData.productMatches[0].price}</li>
					<li className='wineLink'><a href={pairedWineData.productMatches[0].link}>Click Here for more info</a></li>
				</ul>
			</section>
		</main>
	)
}

export default WineList