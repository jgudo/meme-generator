import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { MemeContext } from '../provider/MemeProvider'; 

const UploadButton = () => {
  const { setSelectedImage, triggerLoader } = useContext(MemeContext);

  const onFileChooseChange = (e) => {
    const fileType = e.target.files[0].type;

    triggerLoader(true);
    if (fileType === 'image/jpeg' || fileType === 'image/png') {
      const reader = new FileReader(); 
      reader.addEventListener('load', () => {
        setSelectedImage(reader.result);
        triggerLoader(false);
      });
  
      reader.readAsDataURL(e.target.files[0]);
    } else {
      /* eslint-disable no-alert */
      alert('file type must be JPEG or PNG');
    }
  };

  return (
    <React.Fragment>
      <input 
          className="file-chooser"
          id="file-upload"
          onChange={onFileChooseChange}
          type="file"
      />
      <label 
          className="file-upload-button"
          htmlFor="file-upload"
      >
      Upload Own Photo
      </label>
    </React.Fragment>
  );
};

UploadButton.propTypes = {
  setSelectedImage: PropTypes.func
};

export default UploadButton;
