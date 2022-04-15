import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../Header/Header';
import MessagePopup from '../../1.Admin/MessagePopup/MessagePopup';
import './Register.scss';

const Register = () => {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword]  = useState('');
  const [message, setMessage] = useState('');
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/login");
  }

  const handleRegister = (event) => {
    if (!pseudo || !email || !password) {
      setMessage('Vous devez renseigner tous les champs');
      setOpened(true);
    } else {

      event.preventDefault();
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users`, {
        pseudo: pseudo,
        email: email,
        password: password
      })
      .then((res) => res.data)
      .then(() => {
        setPseudo('');
        setEmail('');
        setPassword('');
        setMessage('Compte créé!');
        setOpened(true);  
      }).then(() => {
      setTimeout(handleNavigation, 3000);
      })
      .catch((err) => err.message)
    }
  }

  return (
    <>
    <Header />
    <MessagePopup message={message} opened={opened} setOpened={setOpened} />
    <form className="register-form flex-center-column">
    <h3>Créez votre compte !</h3>
      <label htmlFor="pseudo" className="public-label">Pseudo*:<br />
        <input type="text" name="pseudo" className="public-input" value={pseudo} onChange={(event) => setPseudo(event.target.value)} />
      </label>
      <label htmlFor="email" className="public-label">Email*:<br />
        <input type="email" name="email" className="public-input" value={email} onChange={(event) => setEmail(event.target.value)}/>
      </label>
      <label htmlFor="password" className="public-label">Mot de passe*:<br />
        <input type="password" name="password" className="public-input" value={password} onChange={(event) => setPassword(event.target.value)}/>
      </label>
      <button type="button" className="public-btn" onClick={handleRegister}>S'enregistrer</button>
      <p>Déjà membre? <Link to="/login">Se connecter</Link></p>
    </form>
    </>
  );
};

export default Register;