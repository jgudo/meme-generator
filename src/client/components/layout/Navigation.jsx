import React from 'react';

import { MemeContext } from '../provider/MemeProvider';
import fileUpload from '../helpers/fileUpload';

const Navigation = () => (
  <div className="navigation">
    <MemeContext.Consumer>
      {({ setSelectedImage }) => (
        <React.Fragment>
          <span className="navigation__title">Memefy</span>
          <input 
              className="file-chooser"
              id="navigation__file-upload"
              onChange={(e) => {
                fileUpload(e, setSelectedImage);
              }}
              type="file"
          />
          <br/>
          <label 
              className="navigation__button button--small"
              htmlFor="navigation__file-upload"
          >
          Upload Own Photo
          </label>
        </React.Fragment>
      )}
    </MemeContext.Consumer>
  </div>
);

export default Navigation;
