import React, { useState } from 'react'
import MealList from './MealList'
import WineList from './WineList'

const App = () => {
	const [mealData, setMealData] = useState(null)
	const [calories, setCalories] = useState(0)
	const [mealSelection, setMealSelection] = useState("")
	const [pairedWineData, setPairedWineData] = useState(null)


	const handleCalorieChange = (e) => {
		setCalories(e.target.value)
	}

	const getMealData = async () => {
		const response = await fetch(`https://api.spoonacular.com/mealplanner/generate?apiKey=30260263cf364e199fe6f749f894680d&timeFrame=day&targetCalories=${calories}`)
		const data = await response.json()
		setMealData(data)
		console.log(data)
	}

	const handleMealSelectionChange = (e) => {
		setMealSelection(e.target.value)
	}

	const getPairedWineData = async () => {
		const response = await fetch(`https://api.spoonacular.com/food/wine/pairing?apiKey=30260263cf364e199fe6f749f894680d&food=${mealSelection}`)
		const data = await response.json()
		setPairedWineData(data)
		console.log(data)
	}

	return (
		<>
			<div>
				<section>
					<p className='app-description'>
						This is a simple app that accepts a food, cuisine or
						ingredient and returns a list of wine pairings with descriptions.
					</p>
					<section className='wine-pairing'>
						<label className='label'>What kind of food are you planning to eat?</label>
						<input
							type='text'
							placeholder='food, cuisine or ingredient'
							value={mealSelection}
							onChange={handleMealSelectionChange} />
						<button onClick={getPairedWineData}>Click to see paired wines</button>
					</section>
				</section>

				{pairedWineData && <WineList pairedWineData={pairedWineData} mealSelection={mealSelection} />}
			</div>
			<div className='calories'>
				<p className='app-description'>
					This is a simple app that will develop a daily menu for you
					dependant on the the amount of daily calories you choose to consume.
				</p>
				<section className='wine-paring'>
					<label className="label" htmlFor='calories'>How many daily calories do you want to consume? </label>
					<input
						type='number'
						placeholder='Calories'
						value={calories}
						onChange={handleCalorieChange} />
					<button onClick={getMealData}>Get Daily Meal Plan</button>

				</section>
				{mealData && <MealList mealData={mealData} />}
			</div>

		</>
	)
}

export default App