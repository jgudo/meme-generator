import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const MemeContext = React.createContext();
const memeApiEndpoint = 'https://api.imgflip.com/get_memes';

class MemeProvider extends Component {
  state = {
    memes: [],
    selectedMeme: {}
  };

  async componentDidMount() {
    try {
      if (localStorage.getItem('memes')) {
        const memes = JSON.parse(localStorage.getItem('memes'));
        this.setState(() => ({ 
          memes,
          selectedMeme: memes[0] 
        }));
      } else this.fetchMeme();
    } catch (e) {
      console.log('Failed to fetch from localStorage ', e);
    }
  }

  fetchMeme = async () => {
    const memeRequest = await fetch(memeApiEndpoint);
    const meme = await memeRequest.json();

    this.setState(() => ({ 
      memes: meme.data.memes,
      selectedMeme: meme[0] 
    }));
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
