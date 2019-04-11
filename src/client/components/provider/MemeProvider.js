import React, { Component } from 'react';
import PropTypes from 'prop-types';
import base64 from '../helpers/base64Image';

export const MemeContext = React.createContext();
const memeApiEndpoint = 'https://api.imgflip.com/get_memes';

class MemeProvider extends Component {
  state = {
    memes: [],
    selectedMeme: null,
    isLoadingImage: false,
    isLoading: false
  };

  componentDidMount() {
    if (localStorage.memefy) {
      const memefy = JSON.parse(localStorage.getItem('memefy'));
      this.setState({
        memes: memefy.memes,
        selectedMeme: memefy.selectedMeme
      });
    } else {
      this.fetchMeme();
    }
  }

  componentDidUpdate() {
    if (localStorage.memefy) {
      const memefy = JSON.parse(localStorage.getItem('memefy'));

      localStorage.setItem('memefy', JSON.stringify({ 
        ...memefy, 
        selectedMeme: this.state.selectedMeme
      }));
    }
  }

  fetchMeme = async () => {
    try {
      this.setState({ isLoading: true, isLoadingImage: true });
      const memeRequest = await fetch(memeApiEndpoint);
      const meme = await memeRequest.json();

      if (meme) {
        this.setState({ 
          memes: meme.data.memes,
          isLoading: false,
          isLoadingImage: false 
        }, () => {
          base64(this.state.memes[0].url).then((img) => {
            this.setState({ selectedMeme: img });
          });
        });
      }

      localStorage.setItem('memefy', JSON.stringify(this.state));
    } catch(e) {
      console.log('Cannot fetch memes from server', e);
    }
  };

  setSelectedImage = (image) => {
    this.setState({ 
      selectedMeme: image,
      isLoadingImage: false
    });
  };

  isLoadingImage = (boolean) => {
    this.setState({ isLoadingImage: boolean });
  }

  render() {
    return (
      <MemeContext.Provider
          value={{ 
            memes: this.state.memes, 
            selectedMeme: this.state.selectedMeme,
            setSelectedImage: this.setSelectedImage,
            isLoadingImage: this.state.isLoadingImage,
            isLoading: this.state.isLoading,
            triggerLoader: this.isLoadingImage
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
