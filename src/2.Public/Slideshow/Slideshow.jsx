import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import axios from 'axios';
import Loader from '../../1.Admin/Loader/Loader';
import 'react-multi-carousel/lib/styles.css';
import './Slideshow.scss';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
    slidesToSlide: 3
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Slideshow = () => {
  const [recipes, setRecipes] = useState({});
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);

  const getImages = async () => {
    await axios.get(`${BACKEND_URL}/api/recettes`)
    .then((res) => res.data)
    .then((data) => setRecipes(data))
    .then(() => setIsLoadingRecipes(false))
    .catch((err) => err.message);
  }

  useEffect(() => {
    getImages();
  }, []);

  return (
    <>
    {!isLoadingRecipes ? (
      <Carousel responsive={responsive}
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      infinite={true}
      arrows={false} 
      showDots={true}
      centerMode={false}
      autoPlay={true}
      className="carousel"
      >
        {recipes?.map((recette) => (
        <div className="each-slide" key={recette?.id_recette}>
                <img className="slide-img" src={`${BACKEND_URL}/images/${recette?.image_recette}`} alt={recette?.nom_recette} />
              </div>
        ))}
      </Carousel>
      ) : <Loader />}
    </>
  );
};

export default Slideshow;