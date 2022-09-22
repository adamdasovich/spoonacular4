import React, { useState } from 'react'
import MealList from './MealList'
import WineList from './WineList'
import FoodList from './FoodList'

const App = () => {
	const [mealData, setMealData] = useState(null)
	const [calories, setCalories] = useState(0)
	const [mealSelection, setMealSelection] = useState("")
	const [pairedWineData, setPairedWineData] = useState(null)
	const [wineSelection, setWineSelection] = useState("")
	const [pairedFoodData, setPairedFoodData] = useState(null)


	const handleCalorieChange = (e) => {
		setCalories(e.target.value)
	}

	const getMealData = async () => {
		const response = await fetch(`https://api.spoonacular.com/mealplanner/generate?apiKey=5bc777447af1431c92d0d8a3a11f6d96&timeFrame=day&targetCalories=${calories}`)
		const data = await response.json()
		setMealData(data)
		console.log(data)
	}

	const handleMealSelectionChange = (e) => {
		setMealSelection(e.target.value)
	}

	const getPairedWineData = async () => {
		const response = await fetch(`https://api.spoonacular.com/food/wine/pairing?apiKey=5bc777447af1431c92d0d8a3a11f6d96&food=${mealSelection}`)
		const data = await response.json()
		setPairedWineData(data)
		console.log(data)
	}

	const handleWineSelectionChange = (e) => {
		setWineSelection(e.target.value)
	}

	const getPairedFoodData = async () => {
		const response = await fetch(`https://api.spoonacular.com/food/wine/dishes?apiKey=5bc777447af1431c92d0d8a3a11f6d96&wine=${wineSelection}`)
		const data = await response.json()
		setPairedFoodData(data)
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
			<div>
				<section>
					<p className='app-description'>
						This is a simple app that accepts a wine type and returns a list of food pairings with descriptions.
					</p>
					<section className='food-pairing'>
						<label className='label'>What kind of wine are you planning to have?</label>
						<input
							type='text'
							placeholder='wine type'
							value={wineSelection}
							onChange={handleWineSelectionChange} />
						<button onClick={getPairedFoodData}>Click to see paired meals</button>
					</section>
				</section>

				{pairedFoodData && <FoodList pairedFoodData={pairedFoodData} wineSelection={wineSelection} />}
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
				<p>Scroll down to see a suggested menu.  Click 'Get Daily Meal Plan' again for
					another suggestion.
				</p>
				{mealData && <MealList mealData={mealData} />}
			</div>

		</>
	)
}

export default App