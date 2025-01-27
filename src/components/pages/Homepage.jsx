import React, { useState } from 'react';
import './../../index.css';
import './../../App.css';
import { Search } from 'lucide-react';
import Recipecard from '../Recipecard';
import "../lib/utils.js";

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Handle the search query and fetch recipes from the API
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      setLoading(true);
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        const data = await response.json();
        if (data.meals) {
          setRecipes(data.meals);
        } else {
          setRecipes([]);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle recipe selection to display full details
  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  // Handle YouTube link click
  const handleYouTubeLink = (recipeName) => {
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(recipeName)}`, '_blank');
  };

  return (
    <div className="bg-[#faf9fb] p-10 flex-1">
      {/* Search Bar */}
      <form onSubmit={handleSearch}>
        <label className="input shadow-md flex items-center gap-2">
          <Search size={24} />
          <input
            type="text"
            className="text-sm md:text-md grow"
            placeholder="What you want to cook today"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </form>

      {/* Display Loading State */}
      {loading && <p>Loading...</p>}

      {/* Recipe Cards Section */}
      <div>
      <a
    href="/"
    className="fixed top-40 right-4 bg-blue-500 text-white px-1 py-2 rounded-lg shadow-lg hover:bg-blue-600"
  > Back to Home</a>
        <p className="font-bold text-3xl md:text-5xl mt-4">Recommended Recipes</p>
        <p className="text-slate-500 font-semibold ml-1 text-sm tracking-tight">
          Popular choices
        </p>

        {/* Display full recipe if a recipe is selected */}
        {selectedRecipe ? (
          <div className="recipe-detail">
            <h2 className="text-3xl font-bold">{selectedRecipe.strMeal}</h2>
            <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} className="rounded-md w-full h-auto my-4" />
            <p className="text-lg font-semibold">Cuisine: {selectedRecipe.strArea}</p>
            <p className="my-2 text-sm">Category: {selectedRecipe.strCategory}</p>
            <div className="ingredients">
              <h3 className="text-xl font-semibold mt-4">Ingredients:</h3>
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
            <div className="instructions">
              <h3 className="text-xl font-semibold mt-4">Instructions:</h3>
              <p className="text-sm">{selectedRecipe.strInstructions}</p>
            </div>
            {/* YouTube link */}
            <button
              onClick={() => handleYouTubeLink(selectedRecipe.strMeal)}
              className="bg-blue-500 text-white p-2 rounded-md mt-4"
            >
              Watch on YouTube
            </button>
          </div>
        ) : (
          // Display recipe cards if no recipe is selected
          <div>
           
            {/* Display recipes if available */}
            {recipes.length > 0 ? (
              <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
                {recipes.map((recipe) => (
                  <div key={recipe.idMeal} className="flex flex-col bg-[#ecf7d4] rounded-md overflow-hidden p-3 relative">
                    <a href="#" className="relative h-32" onClick={() => handleRecipeClick(recipe)}>
                      <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        className="rounded-md w-full h-full object-cover cursor-pointer"
                      />
                      <div className="absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer flex items-center gap-1 text-sm">
                        <p>{recipe.strMeal}</p>
                      </div>
                    </a>
                    <div className="flex flex-col mt-3">
                      <button
                        onClick={() => handleYouTubeLink(recipe.strMeal)}
                        className="font-bold tracking-wide text-blue-600 hover:underline cursor-pointer text-left"
                      >
                        {recipe.strMeal}
                      </button>
                      <p className="my-2 text-sm text-slate-600">Cuisine: {recipe.strArea}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
             <Recipecard/>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
