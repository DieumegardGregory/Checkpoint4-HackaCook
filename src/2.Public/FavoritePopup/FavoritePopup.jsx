import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './FavoritePopup.scss';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const FavoritePopup = () => {
  const [favoriteList, setFavoriteList] = useState([]);
  const params = useParams();

  const getFavoritesList = () => {
    axios.get(`${BACKEND_URL}/api/recettes/favorites/${parseInt(params.id, 10)}`)
    .then((res) => res.data)
    .then((data) => setFavoriteList(data))
    .catch((err) => err.message);
  }

  useEffect(() => {
    getFavoritesList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="favorite-popup flex-center-column">
      <h3>Mes favoris :</h3>
      {favoriteList.length === 0 ? <p>Vous n'avez pas encore de favoris</p> : (
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