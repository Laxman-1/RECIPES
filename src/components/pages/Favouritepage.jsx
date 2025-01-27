import React from "react";
import Recipecard from "../Recipecard";

const Favouritepage = () => {
  const fav = true; // Dummy flag or list for favorites

  return (
    <div className="bg-[#faf9b] flex-1 p-10 min-h-screen">
     {/* <div className="max-w-screen-lg mx-auto">
        <p className="font-bold text-3xl md:text-5xl my-4">My Favourite</p>
        {!fav ? (
          <div className="h-[80vh] flex flex-col items-center gap-4">
            <img src="/404.svg" className="h-34" alt="No favorites found" />
            <p className="text-gray-600">No favorites added yet!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Recipecard />
            <Recipecard />
          </div>
        )}
      </div>*/}
    </div>
  );
};

export default Favouritepage;
