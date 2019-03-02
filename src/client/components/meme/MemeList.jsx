import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { MemeContext } from '../provider/MemeProvider';


import Meme from './MemeItem';

const MemeList = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.addEventListener('DOMContentLoaded', () => {
      if (window.screen.width <= 420) {
        setIsMobile(true);
      }
    });
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 2 : 7,
    slidesToScroll: isMobile ? 2 : 7
  };

  const onSelectImage = (event, array, callback) => {
    const key = event.target.getAttribute('data-key');
    const selected = array.filter((item) => {
      return item.id === key;
    });

    if (selected.length !== 0) {
      callback(selected[0]);
    }
  };

  return (
    <div className="meme__header">
      <h2>Popular Memes</h2>
      <p>Pick one in the list to make a meme</p>
      <div className="meme__wrapper">
        <MemeContext.Consumer>
          {({ memes, setSelectedImage }) => (
            <Slider {...settings}>
              {memes.map((meme) => {
                return (
                  <div 
                      key={meme.id}
                      onClick={(e) => {
                        onSelectImage(e, memes, setSelectedImage);
                      }}
                  >
                    <Meme 
                        meme={meme}
                    />
                  </div>
                );
              })}
            </Slider>
          )}
        </MemeContext.Consumer>
      </div>
    </div>
  );
}; 

export default MemeList;
