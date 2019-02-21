import React from 'react';
import PropTypes from 'prop-types';

const Meme = ({ meme }) => (
  <div className="meme">
    <h3 className="meme__title">{meme.name}</h3>
    <img 
        alt={meme.name}
        className="meme__image"
        src={meme.url} 
      />
  </div>
);

Meme.propTypes = {
  meme: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string
  })
};

export default Meme;
