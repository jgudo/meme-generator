import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const MemeContext = React.createContext();
const memeApiEndpoint = 'https://api.imgflip.com/get_memes';

class MemeProvider extends Component {
  state = {
    memes: []
  };

  async componentDidMount() {
    try {
      if (localStorage.getItem('memes')) {
        const memes = JSON.parse(localStorage.getItem('memes'));
        this.setState(() => ({ memes }));
      } else this.fetchMeme();
    } catch (e) {
      console.log('Failed to fetch from localStorage ', e);
    }
  }

  fetchMeme = async () => {
    const memeRequest = await fetch(memeApiEndpoint);
    const meme = await memeRequest.json();

    this.setState(() => ({ memes: meme.data.memes }));
    localStorage.setItem('memes', JSON.stringify(this.state.memes));
  };

  render() {
    return (
      <MemeContext.Provider
          value={{ memes: this.state.memes }}
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
