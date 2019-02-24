import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const MemeContext = React.createContext();
const memeApiEndpoint = 'https://api.imgflip.com/get_memes';

class MemeProvider extends Component {
  state = {
    memes: [],
    selectedMeme: {}
  };

  componentDidMount() {
    if ('localStorage' in window && localStorage.getItem('memes')) {
      const memes = JSON.parse(localStorage.getItem('memes'));
      this.setState(() => ({ memes }));

      if (localStorage.getItem('memeSettings')) {
        const memeSettings = JSON.parse(localStorage.getItem('memeSettings'));
        if (memeSettings.baseImage !== '') {
          this.setState(() => ({ selectedMeme: { url: memeSettings.baseImage } }));
        } else {
          this.setState(() => ({ selectedMeme: memes.data.memes[0] }));
        }
      }
    } else this.fetchMeme();
  }

  fetchMeme = async () => {
    const memeRequest = await fetch(memeApiEndpoint);
    const meme = await memeRequest.json();

    this.setState(() => ({ memes: meme.data.memes }));
    localStorage.setItem('memes', JSON.stringify(this.state.memes));
  };

  setSelectedImage = (image) => {
    this.setState(() => ({ selectedMeme: image }));
  };

  render() {
    return (
      <MemeContext.Provider
          value={{ 
            memes: this.state.memes, 
            selectedMeme: this.state.selectedMeme,
            setSelectedImage: this.setSelectedImage
          }}
      >
        {this.props.children}
        </MemeContext.Provider>
    );
  }
}

MemeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default MemeProvider;
