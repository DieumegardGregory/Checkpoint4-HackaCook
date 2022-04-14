import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FavoritePopup.scss';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const FavoritePopup = () => {
  const [favoriteList, setFavoriteList] = useState([]);

  const getFavoritesList = () => {
    axios.get(`${BACKEND_URL}/api/recettes/favorites`)
    .then((res) => res.data)
    .then((data) => setFavoriteList(data))
    .catch((err) => err.message);
  }

  useEffect(() => {
    getFavoritesList();
  }, []);

  console.log(favoriteList)

  return (
    <div className="favorite-popup flex-center-column">
      <h3>Mes favoris :</h3>
      {favoriteList.length === 0 ? 'Vous n\'avez pas encore de favoris' : (
        favoriteList.map((favoris) => (
          <div key={favoris.recette_id}>
            {favoris.nom_recette}
          </div>
        ))
      ) }
    </div>
  );
};

export default FavoritePopup;