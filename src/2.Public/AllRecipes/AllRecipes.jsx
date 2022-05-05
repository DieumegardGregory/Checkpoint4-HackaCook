import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import { BsFillClockFill } from 'react-icons/bs';
import { GiKnifeFork } from 'react-icons/gi';
import './AllRecipes.scss';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  const getRecipes = () => {
    axios.get(`${BACKEND_URL}/api/recettes`)
    .then((res) => res.data)
    .then((data) => setRecipes(data))
    .catch((err) => err.message);
  }

  useEffect(() => {
    getRecipes();
  }, [])


  const seeRecipe = (id) => {
    navigate(`/recette/${id}`);
  }

  return (
    <div className="public-page">
    <Header />
    <Navigation />
      <h2>Toutes les recettes :</h2>
    <div className="recipes-page flex-center-row">
 {recipes?.map((recipe) => (
   <div className="recipe-container flex-center-column" key={recipe.id_recette}>
     <div className="recipe-header flex-center-row">
        <p className="recipe-title">{recipe.nom_recette}</p>
     </div>
   <div className="recipe-image-container">
     <img src={`${BACKEND_URL}/images/${recipe.image_recette}`} alt={recipe.nom_recette} />
   </div>
   <p><BsFillClockFill className="recipe-icon"/>{recipe.temps_preparation} minutes.</p>
   <p><GiKnifeFork className="recipe-icon"/>Pour {recipe.nb_personnes} personnes.</p>
   <button type="button" className="recipe-btn" onClick={() => seeRecipe(recipe.id_recette)}>J'ai faim !</button>
 </div>

 ))}
    </div>
    <Footer />
    </div>
  );
};

export default AllRecipes;