import React from 'react';
import { MemeContext } from '../provider/MemeProvider';

import Meme from './MemeItem';

const MemeList = () => (
  <div className="meme__wrapper">
    <MemeContext.Consumer>
    {({ memes }) => {
      return memes.map((meme) => {
        return (
          <Meme 
              key={meme.id}
              meme={meme}
          />
        );
      });
    }}
  </MemeContext.Consumer>
  </div>
);

export default MemeList;
