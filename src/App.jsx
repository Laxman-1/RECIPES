import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/pages/Homepage";
import FavouritePage from "./components/pages/Favouritepage";


function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favourites" element={<FavouritePage />} />
      </Routes>
    </div>
  );
}

export default App;
