import React, { useState } from 'react'
import MealList from './MealList'
import WineList from './WineList'

const App = () => {
	const [mealData, setMealData] = useState(null)
	const [calories, setCalories] = useState(2000)
	const [mealSelection, setMealSelection] = useState("steak")
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
			<div className='calories'>
				<section className='controls'>
					<label htmlFor='calories'>How many daily calories do you want to consume?  </label>
					<input
						type='number'
						placeholder='Calories'
						value={calories}
						onChange={handleCalorieChange}
					/>
				</section>
				<button onClick={getMealData}>Get Daily Meal Plan</button>
				{mealData && <MealList mealData={mealData} />}
			</div>
			<div>
				<section>
					<label>What kind of food are you planning to eat?</label>
					<input
						type='text'
						placeholder='Search for a paired wine.'
						value={mealSelection}
						onChange={handleMealSelectionChange} />
				</section>
				<button onClick={getPairedWineData}>Get Wine Pairing</button>
				{pairedWineData && <WineList pairedWineData={pairedWineData} mealSelection={mealSelection} />}
			</div>

		</>
	)
}

export default App