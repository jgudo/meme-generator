import React from 'react';

import { MemeContext } from '../provider/MemeProvider';
import UploadButton from './UploadButton';

const Navigation = () => (
  <div className="navigation">
    <MemeContext.Consumer>
      {({ setSelectedImage }) => (
        <React.Fragment>
          <span className="navigation__title">Memefy</span>
          <UploadButton setSelectedImage={setSelectedImage}/>
        </React.Fragment>
      )}
    </MemeContext.Consumer>
  </div>
);

export default Navigation;
