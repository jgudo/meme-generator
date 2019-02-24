import React from 'react';
import PropTypes from 'prop-types';

const UploadButton = (props) => {
  const onFileChooseChange = (e, callback) => {
    const fileType = e.target.files[0].type;
    if (fileType === 'image/jpeg' || fileType === 'image/png') {
      const reader = new FileReader(); 
      reader.addEventListener('load', () => {
        callback({ url: reader.result });
      });
  
      reader.readAsDataURL(e.target.files[0]);
    } else {
      /* eslinst-disable */
      alert('file type must be JPEG or PNG');
      /* eslinst-enable */
    }
  };

  return (
    <React.Fragment>
      <input 
          className="file-chooser"
          id="file-upload"
          onChange={(e) => {
            onFileChooseChange(e, props.setSelectedImage);
          }}
          type="file"
      />
      <br/>
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
