import React, { useState, useEffect, useContext } from 'react';
import Slider from 'react-slick';

import { MemeContext } from '../provider/MemeProvider';
import Meme from './MemeItem';
import Loader from '../layout/Loader';

const MemeList = () => {
  const { isLoading, memes } = useContext(MemeContext);
  const [isMobile, setIsMobile] = useState(false);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 2 : 7,
    slidesToScroll: isMobile ? 2 : 7
  };

  useEffect(() => {
    if (window.screen.width <= 420) {
      setIsMobile(true);
    }
  }, []);

  return (
    <div className="meme__header">
      <h2>Popular Memes</h2>
      <p>Pick one in the list to make a meme</p>
      <div className="meme__wrapper">
        {isLoading ? (
          <Loader />
        ) : (
          <Slider {...settings}>
            {memes.map(meme => (
              <Meme 
                  key={meme.id}
                  meme={meme}
              />
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}; 

export default MemeList;
