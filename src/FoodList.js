import React from 'react'

const FoodList = ({ pairedFoodData, wineSelection }) => {
	return (
		<main>
			<section className='wine'>
				<h3>Recommended meals to enjoy with {wineSelection} include:</h3>
				<div>
					<ul className='foodList'>
						{pairedFoodData.pairings.map((food) => {
							return <li key={food}>{food}</li>
						})}
					</ul>
					<div className='wineText'>{pairedFoodData.text}</div>
				</div>

			</section>
		</main>
	)
}

export default FoodList