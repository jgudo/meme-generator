import React from 'react';
import PropTypes from 'prop-types';

const Meme = ({ meme }) => (
  <div className="meme">
    <div className="meme__image">
      <img 
          alt={meme.name}
          data-key={meme.id} 
          src={meme.url} 
      />
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
