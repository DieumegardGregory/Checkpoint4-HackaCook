import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineUpload } from 'react-icons/ai';
import './Admin.scss';


const Admin = () => {
  const [recipeImg, setRecipeImg] = useState({});
  const [recipeName, setRecipeName] = useState('');
  const [recipeTime, setRecipeTime] = useState('');
  const [recipePersons, setRecipePersons] = useState('');
  const [recipeStuff, setRecipeStuff] = useState('');

  const handleUpload = (event) => {
    setRecipeImg(event.target.files[0]);
  }

  const handleAddRecipe = (event) => {
    event.preventDefault();
    const recipe = new FormData();
    recipe.append('file', recipeImg);
    recipe.append('temps_preparation', recipeTime);
    recipe.append('nb_personnes', recipePersons);
    recipe.append('nom_recette', recipeName);
    recipe.append('instructions_recette', recipeStuff);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/recettes` , recipe)
    .then((res) => res.data)
    .then((data) => console.log(data))
    .catch((err) => err.message)
  }

  return (
    <>
    <h2>Ajouter une recette</h2>
    <form className="addElement-form flex-center-column">
    <label htmlFor="recipe-name" className="admin-label">
      Nom recette:<br />
      <input type="text" className="input-admin" name="recipe-name" placeholder="nom de la recette" value={recipeName} onChange={(event) => setRecipeName(event.target.value) } />
    </label><label htmlFor="recipe-time" className="admin-label">
      Temps de préparation:<br />
      <input type="text" className="input-admin" name="recipe-time" placeholder="en minutes" value={recipeTime} onChange={(event) => setRecipeTime(event.target.value)} />
    </label>
    <label htmlFor="recipe-name" className="admin-label">
      Pour combien de personnes:<br />
      <input type="text" className="input-admin" name="recipe-persons" placeholder="combien ?" value={recipePersons} onChange={(event) => setRecipePersons(event.target.value)} />
    </label>
    <label htmlFor="recipe-picture" className="admin-label file-label">
      Ajoutez une image* <AiOutlineUpload />
      <input type="file" name="recipe-picture" id="recipe-picture" className="input-admin file-input" onChange={handleUpload} />
      <p>{recipeImg.name ? recipeImg.name : null}</p>
    </label>
    <label htmlFor="recipe-stuff" className="admin-label">
      Instructions recette:<br />
      <textarea className="text-admin" name="recipe-stuff" placeholder="Ingrédients, préparation ..." value={recipeStuff} onChange={(event) => setRecipeStuff(event.target.value)} />
    </label>
    <button type="button" className="admin-btn" onClick={handleAddRecipe}>Ajouter</button>
    </form>
    </>
  );
};

export default Admin;