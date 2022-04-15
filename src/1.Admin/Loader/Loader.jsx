import React from 'react';
import './Loader.scss';

const Loader = () => {
  return (
    <div className="loader-container flex-center-column">
      <div className="circle-container">
        <div className="rotator first"></div>
        <div className="rotator second"></div>
      <p>Chargement ...</p>
      </div>
    </div>
  );
};

export default Loader;