import React from 'react';
import './BurgerMenu.scss';

const BurgerMenu = ({ isClicked, handleClick }) => {

  return (
    <>
      <button
        type="button"
        className={`flex-center-column burger burger-${
          isClicked ? 'opened' : 'closed'
        }`}
        onClick={handleClick}
      >
        <div className="line line1" />
        <div className="line line2" />
        <div className="line line3" />
      </button>
    </>
  );
};

export default BurgerMenu;