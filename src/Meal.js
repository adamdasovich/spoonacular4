import React, { useState, useEffect } from 'react'

const Meal = ({ meal }) => {
	const [imageUrl, setImageUrl] = useState("")

	useEffect(() => {
		const getImage = async () => {
			const response = await fetch(`https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=5bc777447af1431c92d0d8a3a11f6d96&includeNutrition=false`)
			const data = await response.json()
			setImageUrl(data.image)
		}
		getImage()
	}, [meal.id])

	return (
		<article>
			<h1>{meal.title}</h1>
			<img src={imageUrl} alt={meal.title} />
			<ul className='instructions'>
				<li>Preparation time: {meal.readyInMinutes} minutes</li>
				<li>Servings: {meal.servings}</li>
			</ul>
			<a href={meal.sourceUrl}>Go to Recipe</a>
		</article>
	)
}

export default Meal