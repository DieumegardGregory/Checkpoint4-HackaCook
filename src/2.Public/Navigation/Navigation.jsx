import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import './Navigation.scss';

const Navigation = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  }

  const listItems = [
    {
      id: 1,
      fonction: 'Liste recettes',
      path: '/recettes',
    },
    {
      id: 2,
      fonction: 'S\'enregistrer',
      path: '/register',
    },
    {
      id: 3,
      fonction: 'Se connecter',
      path: '/login',
    }
  ];

  return (
    <>
    <BurgerMenu isClicked={isClicked} handleClick={handleClick} />
      <div
        className={
          isClicked
            ? 'menu-container visible flex-center-column'
            : 'menu-container hidden flex-center-column'
        }
        
      >
        <div className="menu-list-container">
        <h3 className="h3Admin">Menu</h3>

        <ul className="nav-list flex-center-column">
          {listItems.map((item) => (
            <li key={item.id} className="nav-item">
              <NavLink to={item.path}>{item.fonction}</NavLink>
            </li>
          ))}
        </ul>
       </div> 
      </div>
    </>
  );
};

export default Navigation;