import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-load';

import ImageLoader from '../layout/ImageLoader';

const Meme = ({ meme }) => (
  <div className="meme">
    <div className="meme__image">
      <LazyLoad 
          height={100}
          debounce={false}
          offsetVertical={250}
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

Meme.propTypes = {
  meme: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string
  })
};

export default Meme;
