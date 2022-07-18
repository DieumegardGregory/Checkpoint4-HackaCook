import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo-hackacook.png';
import './Header.scss';

const Header = () => {
  return (
    <>
    <div className="header-container grid-20-80">
      <NavLink to="/">
          <img className="logo" src={logo} alt="logo-hackacook" />
        </NavLink>
        <div className="title-container">
          <h1>Hackacook !</h1>
        </div>
    </div>
    <div className="header-cale"></div>
    </>
  );
};

export default Header;