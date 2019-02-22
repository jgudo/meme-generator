import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import base64 from '../helpers/base64Image';
import { MemeContext } from '../provider/MemeProvider';

class MemePanel extends Component {
  state = {
    topText: 'TOP TEXT',
    topTextColor: '#000',
    bottomText: 'BOTTOM TEXT',
    bottomTextColor: '#000',
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

  onTopTextColorChange = (e) => {
    const color = e.target.value;
    this.setState(() => ({ topTextColor: color }));
  };

  onBottomTextColorChange = (e) => {
    const color = e.target.value;
    this.setState(() => ({ bottomTextColor: color }));
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
                    <h1 
                        className="meme__text"
                        style={{
                          color: this.state.topTextColor
                        }}>
                      {topText}
                    </h1>
                  </div>
                  <img 
                      alt=""
                      className="meme__image-selected"
                      src={this.state.baseImage} 
                  />
                  <div className="meme__bottom-text">
                    <h1 
                        className="meme__text"
                        style={{
                          color: this.state.bottomTextColor
                        }}>
                    {bottomText}
                    </h1>
                  </div>
                </div>
                <div className="meme__form">
                  <div className="meme__form-control">
                    <span className="meme__form-title">Top Text</span>  
                    <div className="meme__form-wrapper">
                      <input 
                          onChange={this.onTopTextChange}
                          placeholder="Top Text"
                          type="text" 
                          value={topText}
                      />
                      <input
                          onChange={this.onTopTextColorChange} 
                          style={{ marginLeft: '15px' }}
                          type="color"
                      />
                    </div>
                  </div>
                  <div className="meme__form-control">  
                    <span className="meme__form-title">Top Text</span> 
                    <div className="meme__form-wrapper">
                      <input 
                          onChange={this.onBottomTextChange}
                          placeholder="Bottom Text"
                          type="text" 
                          value={bottomText}
                      />
                      <input 
                          onChange={this.onBottomTextColorChange}
                          style={{ marginLeft: '15px' }}
                          type="color"
                      />
                    </div>
                  </div>
                  <div className="meme__form-control">
                    <input 
                        className="file-chooser"
                        id="file"
                        onChange={this.onFileChooseChange}
                        type="file"
                    />
                    <br/>
                    <label for="file">
                    Upload Own Photo
                    </label>
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
