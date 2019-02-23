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

export default onFileChooseChange;
