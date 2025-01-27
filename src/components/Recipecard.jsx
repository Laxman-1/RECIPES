import React, { useState } from 'react';
import { Heart, HeartPulse, List, Soup } from 'lucide-react';

const Recipecard = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null); // State to hold selected recipe details
  const [loading, setLoading] = useState(false);

  // Fetch recipe details when a recipe card is clicked
  const fetchRecipeDetails = async (recipeName) => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`);
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        setSelectedRecipe(data.meals[0]); // Store the recipe details in the state
      }else{
        console.error('Error fetching recipe details:', error)
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    } finally {
      setLoading(false);
    }
  };

  // Redirect to YouTube for a recipe search
  const redirectToYouTube = (recipeName) => {
    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(recipeName)}`;
    window.open(youtubeSearchUrl, '_blank');
  };

  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
      {/* If recipe is selected, show its details */}
      {selectedRecipe ? (
        <div className="flex flex-col bg-[#ecf7d4] rounded-md overflow-hidden p-3 relative">
          <h2 className="font-bold text-2xl">{selectedRecipe.strMeal}</h2>
          <img
            src={selectedRecipe.strMealThumb}
            alt={selectedRecipe.strMeal}
            className="rounded-md w-full h-auto object-cover my-4"
          />
          <p className="text-sm">{selectedRecipe.strCategory} | {selectedRecipe.strArea}</p>
          
          <div className="mt-4">
            <h3 className="font-semibold text-lg">Ingredients:</h3>
            <ul>
              {Array.from({ length: 20 }).map((_, i) => {
                const ingredient = selectedRecipe[`strIngredient${i + 1}`];
                const measure = selectedRecipe[`strMeasure${i + 1}`];
                if (ingredient && ingredient !== '') {
                  return (
                    <li key={i} className="text-sm">{measure} {ingredient}</li>
                  );
                }
                return null;
              })}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-lg">Instructions:</h3>
            <p className="text-sm">{selectedRecipe.strInstructions}</p>
          </div>

          <button
            onClick={() => redirectToYouTube(selectedRecipe.strMeal)}
            className="bg-blue-500 text-white p-2 rounded-md mt-4"
          >
            Watch on YouTube
          </button>

          {/* Button to go back to the list of recipes */}
          <button
            onClick={() => setSelectedRecipe(null)}
            className="bg-gray-500 text-white p-2 rounded-md mt-4"
          >
            Back to Recipe List
          </button>
        </div>
      ) : (
        // If no recipe is selected, show the recipe cards
        <>
          <div className="flex flex-col bg-[#ecf7d4] rounded-md overflow-hidden p-3 relative">
            <a href="#" className="relative h-32" onClick={() => fetchRecipeDetails(' soup')}>
              <img
                src="/1.jpg"
                alt="soup"
                className="rounded-md w-full h-full object-cover cursor-pointer"
              />
              <div className="absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer flex items-center gap-1 text-sm">
                <Soup size={16} /> 4 Servings
              </div>
            </a>
            <div className="flex flex-col mt-3">
              <button
                onClick={() => fetchRecipeDetails('soup')}
                className="font-bold tracking-wide text-blue-600 hover:underline cursor-pointer text-left"
              >
             Leblebi Soup
              </button>
              <p className="my-2 text-sm text-slate-600">Turkish Kitchen</p>
            </div>
          </div>

          <div className="flex flex-col bg-[#ecf7d4] rounded-md overflow-hidden p-3 relative">
            <a href="#" className="relative h-32" onClick={() => fetchRecipeDetails(' Chicken Curry')}>
              <img
                src="/curry.jpg"
                alt=" Chicken Curry"
                className="rounded-md w-full h-full object-cover cursor-pointer"
              />
              <div className="absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer flex items-center gap-1 text-sm">
                <Soup size={16} /> 4 Servings
              </div>
            </a>
            <div className="flex flex-col mt-3">
              <button
                onClick={() => fetchRecipeDetails(' Chicken Curry')}
                className="font-bold tracking-wide text-blue-600 hover:underline cursor-pointer text-left"
              >
                Curry
              </button>
              <p className="my-2 text-sm text-slate-600">Nepali Kitchen</p>
            </div>
          </div>

          <div className="flex flex-col bg-[#ecf7d4] rounded-md overflow-hidden p-3 relative">
            <a href="#" className="relative h-32" onClick={() => fetchRecipeDetails('Pizza')}>
              <img
                src="/2.jpg"
                alt="Pizza"
                className="rounded-md w-full h-full object-cover cursor-pointer"
              />
              <div className="absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer flex items-center gap-1 text-sm">
                <Soup size={16} /> 7 Servings
              </div>
            </a>
            <div className="flex flex-col mt-3">
              <button
                onClick={() => fetchRecipeDetails('Pizza')}
                className="font-bold tracking-wide text-blue-600 hover:underline cursor-pointer text-left"
              >
                Pizza
              </button>
              <p className="my-2 text-sm text-slate-600">Italian Kitchen</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Recipecard;
