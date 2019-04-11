import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-load';

import ImageLoader from '../layout/ImageLoader';
import { MemeContext } from '../provider/MemeProvider';
import base64 from '../helpers/base64Image';

const Meme = ({ meme }) => {
  const state = useContext(MemeContext);

  const onSelectImage = () => {
    const selected = state.memes.filter((item) => {
      return item.id === meme.id;
    });

    state.triggerLoader(true);
    if (selected.length !== 0) {
      base64(selected[0].url)
        .then((img) => {
          state.setSelectedImage(img);
        })
        .catch((e) => {
          console.log('Cannot fetch selected image', e);
        });
    }
  };

  return (
    <div 
        className="meme"
        onClick={onSelectImage}
    >
      <div className="meme__image">
        <LazyLoad 
            debounce={false}
            height={100}
            offsetVertical={500}
          >
            <ImageLoader 
                alt={meme.name}
                imgId={meme.id} 
                src={meme.url} 
            />
        </LazyLoad>
      </div>
      <div className="meme__title">
        <h3>{meme.name}</h3>
      </div>
    </div>
  );
};

Meme.propTypes = {
  meme: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string
  })
};

export default Meme;
