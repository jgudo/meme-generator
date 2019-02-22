import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import base64 from '../helpers/base64Image';
import { MemeContext } from '../provider/MemeProvider';

class MemePanel extends Component {
  state = {
    topText: 'TOP TEXT',
    bottomText: 'BOTTOM TEXT',
    baseImage: ''
  };

  onTopTextChange = (e) => {
    const topText = e.target.value;
    this.setState(() => ({ topText }));
  };

  onBottomTextChange = (e) => {
    const bottomText = e.target.value;
    this.setState(() => ({ bottomText }));
  };

  onSaveHandler = () => {
    html2canvas(this.meme__image)
      .then((canvas) => {
        // const myImage = canvas.toDataURL('image/png');
        const date = new Date().getTime(); 
        canvas.toBlob((blob) => {
          saveAs(blob, `meme-${date}.png`);
        });
      });
  };

  render() {
    const { topText, bottomText } = this.state;
    return (
      <div className="meme__panel">
        <MemeContext.Consumer>
          {({ selectedMeme }) => {
            base64(selectedMeme.url).then((base64Img) => {
              this.setState(() => ({ baseImage: base64Img }));
            });
            return (
              <React.Fragment>
                <div 
                    className="meme__editor"
                    /* eslint-disable */
                    ref={node => this.meme__image = node}
                    /* eslint-enable */
                >
                  <div className="meme__top-text">
                    <h1>{topText}</h1>
                  </div>
                  <img 
                      alt=""
                      className="meme__image-selected"
                      src={this.state.baseImage} 
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
                    <button onClick={this.onSaveHandler}>Save Meme</button>
                  </div>
                </div>
              </React.Fragment>
            );
          }}
        </MemeContext.Consumer>
      </div>
    );
  }
}

export default MemePanel;
