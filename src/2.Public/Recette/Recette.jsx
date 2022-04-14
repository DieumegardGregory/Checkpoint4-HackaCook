import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BsFillClockFill } from 'react-icons/bs';
import { GiKnifeFork } from 'react-icons/gi';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Recette.scss';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Recette = () => {
  const [recipe, setRecipe] = useState({});
  const params = useParams();

  const getRecipe = () => {
    axios.get(`${BACKEND_URL}/api/recettes/${params.id}`)
    .then((res) => res.data)
    .then((data) => setRecipe(data))
    .catch((err) => err.message);
  }

  useEffect(() => {
    getRecipe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="public-page">
    <Header />
    <div className="page-recette flex-center-column">
      <h4>{recipe.nom_recette}</h4>
      <div className="image-container">
        <img src={`${BACKEND_URL}/images/${recipe.image_recette}`} alt={recipe.nom_recette} />
      </div>
      <div className="infos-container flex-center-row">
        <p><BsFillClockFill className="recipe-icon"/>{recipe.temps_preparation} minutes.</p>
        <p><GiKnifeFork className="recipe-icon"/>Pour {recipe.nb_personnes} personnes.</p>
      </div>
      <section className="instructions">{recipe.instructions_recette}</section>
    </div>
    <Footer />
    </div>
  );
};

export default Recette;