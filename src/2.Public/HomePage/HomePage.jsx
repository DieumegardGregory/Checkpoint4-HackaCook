/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import Header from '../Header/Header';  
import Navigation from '../Navigation/Navigation';
import Slideshow from '../Slideshow/Slideshow';
import RecipesList from '../RecipesList/RecipesList';
import FavoritePopup from '../FavoritePopup/FavoritePopup';
import Footer from '../Footer/Footer';
import './HomePage.scss';

const HomePage = () => {
  const [userPseudo, setUserPseudo] = useState('');
  const [recipeTime, setRecipeTime] = useState('');
  const [searchFilter, setSearchFilter] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const params = useParams();
  const location = useLocation();

  const getUserPseudo = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/${params.id}`)
    .then((res) => res.data)
    .then((data) => setUserPseudo(data.pseudo))
    .catch((err) => err.message);
  }

  useEffect(() => {
    if (location.pathname.includes('logged')) {
    getUserPseudo();
    }
  }, []);

  const handleSearch = () => {
    setSearchFilter(parseInt(recipeTime, 10));
  };

const handleFavorite = () => {
  setOpenPopup(!openPopup);
};

  return (
    <div className="public-page">
      {openPopup ? <FavoritePopup /> : null}
    <Header />
    <Navigation  userPseudo={userPseudo} handleFavorite={handleFavorite} openPopup={openPopup} />
    <Slideshow />
    <div className="search-container flex-center-column">
      <p>De quel temps de préparation disposez vous ?</p>
      <div className="search-input-container">
      <label htmlFor="search-recipe" className="public-label">
        <input type="text" className="public-input" placeholder="en minutes" value={recipeTime} onChange={(event) => setRecipeTime(event.target.value)} />
      </label>
      <BsSearch className="search-icon" onClick={() => handleSearch()} />
      </div>
    </div>
    <RecipesList searchFilter={searchFilter} />
     
    <Footer />
    </div>
  );
};

export default HomePage;