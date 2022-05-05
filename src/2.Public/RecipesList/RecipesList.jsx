import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BsFillClockFill } from 'react-icons/bs';
import { GiKnifeFork } from 'react-icons/gi';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import Loader from '../../1.Admin/Loader/Loader';
import MessagePopup from '../../1.Admin/MessagePopup/MessagePopup';
import './RecipesList.scss';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const RecipesList = ({searchFilter}) => {
  const [recipesFound, setRecipesFound] = useState([]);
  const [message, setMessage] = useState('');
  const [opened, setOpened] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const findRecipes = () => {
    axios.get(`${BACKEND_URL}/api/recettes?recipeTime=${searchFilter}`)
    .then((res) => res.data)
    .then((data) => {
      setRecipesFound(data);
    })

    .catch((err) => err.message);
  }

  const getFavoritesList = () => {
    axios.get(`${BACKEND_URL}/api/recettes/favorites/${parseInt(params.id, 10)}`)
    .then((res) => res.data)
    .then((data) => setFavoriteList(data))
    .catch((err) => err.message);
  }

  useEffect(() => {
    if(searchFilter !== 0) {
      findRecipes();
    }
    getFavoritesList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilter]);

  const seeRecipe = (id) => {
    navigate(`/recette/${id}`);
  }
console.log("favoris?", favoriteList)
  const handleAddFavorite = (id) => {
    if (!params.id) {
      setMessage('Vous devez être connecté pour ajouter un favori!');
      setOpened(true);
    } else {

      axios.post(`${BACKEND_URL}/api/recettes/favorites`,
      {
        user_id: parseInt(params.id, 10),
        recette_id: id
      },
      {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((data) => console.log(data))
      .then(() => getFavoritesList())
      .catch((err) => err.message)
    }
  }

  const handleDeleteFavorite = (id) => {
    if (!params.id) {
      setMessage('Vous devez être connecté pour ajouter un favori!');
      setOpened(true);
    } else {
      axios.delete(`${BACKEND_URL}/api/recettes/favorites/${params.id}/${id}`,
      {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((data) => console.log(data))
      .then(() => getFavoritesList())
      .catch((err) => err.message);
    }
  }

  return (
    <div className="public-page">
      <MessagePopup message={message} opened={opened} setOpened={setOpened} />
    {/* <div className="recipes-list-header flex-center-row">

    </div> */}
      {recipesFound ? (
        <div className="recipes-container flex-center-column">
        {recipesFound.length > 0 ? <h3>Recettes disponibles:</h3> : null}
      {recipesFound?.map((recipe) => (
        <div className="recipe-container flex-center-row" key={recipe.id_recette}>
          <p className="recipe-title">{recipe.nom_recette}</p>
          {favoriteList.find((item) => item.nom_recette === recipe.nom_recette) ? <AiFillStar className="favorite-icon" onClick={() => handleDeleteFavorite(recipe.id_recette)} /> : <AiOutlineStar className="favorite-icon" onClick={() => handleAddFavorite(recipe.id_recette)}/>}
          <div className="recipe-image-container">
            <img src={`${BACKEND_URL}/images/${recipe.image_recette}`} alt={recipe.nom_recette} />
          </div>
          <p><BsFillClockFill className="recipe-icon"/>{recipe.temps_preparation} minutes.</p>
          <p><GiKnifeFork className="recipe-icon"/>Pour {recipe.nb_personnes} personnes.</p>
          <button type="button" className="recipe-btn" onClick={() => seeRecipe(recipe.id_recette)}>J'ai faim !</button>
        </div>
      ))}
      </div>
      ) : <Loader />}
    </div>
  );
};

export default RecipesList;