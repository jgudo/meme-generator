import React, { Component } from 'react';
import { MemeContext } from '../provider/MemeProvider';

class MemePanel extends Component {
  state = {
    topText: 'TOP TEXT',
    bottomText: 'BOTTOM TEXT'
  };

  onTopTextChange = (e) => {
    const topText = e.target.value;
    this.setState(() => ({ topText }));
  };

  onBottomTextChange = (e) => {
    const bottomText = e.target.value;
    this.setState(() => ({ bottomText }));
  };
  
  render() {
    const { topText, bottomText } = this.state;
    return (
      <div className="meme__panel">
        <MemeContext.Consumer>
          {({ selectedMeme }) => (
            <React.Fragment>
              <div className="meme__editor">
                <div className="meme__top-text">
                  <h1>{topText}</h1>
                </div>
                <img 
                    alt=""
                    className="meme__image-selected"
                    src={selectedMeme.url} 
                />
                <div className="meme__bottom-text">
                  <h1>{bottomText}</h1>
                </div>
              </div>
              <div className="meme__form">
                <div className="meme__form-control">
                  <span className="meme__form-title">Top Text</span>  
                  <input 
                      onChange={this.onTopTextChange}
                      placeholder="Top Text"
                      type="text" 
                      value={topText}
                  />
                </div>
                <div className="meme__form-control">  
                  <span className="meme__form-title">Top Text</span> 
                  <input 
                      onChange={this.onBottomTextChange}
                      placeholder="Bottom Text"
                      type="text" 
                      value={bottomText}
                  />
                </div>
                <div className="meme__form-control">
                  <button>Upload Own Photo</button>
                </div>
                <br/>
                <div className="meme__form-control">
                  <button>Save Meme</button>
                </div>
              </div>
            </React.Fragment>
          )}
        </MemeContext.Consumer>
      </div>
    );
  }
}

export default MemePanel;
