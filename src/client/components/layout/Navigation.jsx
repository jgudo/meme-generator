import React, { useContext } from 'react';

import { MemeContext } from '../provider/MemeProvider';
import UploadButton from './UploadButton';

const Navigation = () => {
  const state = useContext(MemeContext);
  return (
    <div className="navigation">
      <span className="navigation__title">Memefy</span>
      <UploadButton setSelectedImage={state.setSelectedImage}/>
    </div>
  );
};

export default Navigation;
