import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { MemeContext } from '../provider/MemeProvider';

import UploadButton from '../layout/UploadButton';
import Loader from '../layout/Loader';

import interact from '../helpers/interact';

class MemePanel extends Component {
  static contextType = MemeContext;

  state = {
    topText: 'TOP TEXT',
    topTextColor: '#ffffff',
    bottomText: 'BOTTOM TEXT',
    bottomTextColor: '#ffffff'
  };

  componentDidMount() {
    if ('localStorage' in window && localStorage.memefy) {
      const memefy = JSON.parse(localStorage.getItem('memefy'));
      if (memefy.settings) this.setState({ ...memefy.settings });
    }
   
    if (!this.context.isLoadingImage) {
      interact(this.meme__top_text);
      interact(this.meme__bottom_text);
    }
  }

  componentDidUpdate() {
    try {
      if ('localStorage' in window && localStorage.memefy) {
        const memefy = JSON.parse(localStorage.getItem('memefy'));
        localStorage.setItem('memefy', JSON.stringify({ 
          ...memefy, 
          settings: this.state 
        }));
      }
    } catch (e) {
      console.log('Cannot save to localStorage', e);
    }

    if (!this.context.isLoadingImage) {
      interact(this.meme__top_text);
      interact(this.meme__bottom_text);
    }
  }

  onTopTextChange = (e) => {
    const topText = e.target.value;
    this.setState({ topText });
  };

  onBottomTextChange = (e) => {
    const bottomText = e.target.value;
    this.setState({ bottomText });
  };

  onSaveHandler = () => {
    this.save__button.disabled = true;
    this.save__button.textContent = 'Saving Meme ...';
    
    html2canvas(this.meme__image)
      .then((canvas) => {
        const date = new Date().getTime(); 

        canvas.toBlob((blob) => {
          saveAs(blob, `meme-${date}.png`);
        });
        
        this.save__button.disabled = false;
        this.save__button.textContent = 'Save Meme';
      });
  };

  onTopTextColorChange = (e) => {
    const color = e.target.value;
    this.setState({ topTextColor: color });
  };

  onBottomTextColorChange = (e) => {
    const color = e.target.value;
    this.setState({ bottomTextColor: color });
  };

  render() {
    const { 
      topText, 
      bottomText,
      topTextColor,
      bottomTextColor
    } = this.state;

    const { 
      setSelectedImage, 
      selectedMeme,
      isLoadingImage
    } = this.context;

    return (
      <div className="meme__panel">
        <div 
            className="meme__editor"
            ref={node => this.meme__image = node}
        >
          {isLoadingImage ? (
            <Loader />
          ) : (
            <React.Fragment>
              <div 
                  className="meme__top-text"
                  draggable="true"
                  ref={node => this.meme__top_text = node}
              >
                <h1 
                    className="meme__text"
                    style={{
                      color: topTextColor
                    }}>
                  {topText}
                </h1>
              </div>
              <img 
                  alt=""
                  className="meme__image-selected"
                  src={selectedMeme} 
              />
              <div 
                  className="meme__bottom-text"
                  draggable="true"
                  ref={node => this.meme__bottom_text = node }
              >
                <h1 
                    className="meme__text"
                    style={{
                      color: bottomTextColor
                    }}>
                {bottomText}
                </h1>
              </div>
            </React.Fragment>
          )}
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
                  value={topTextColor}
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
                  value={bottomTextColor}
              />
            </div>
          </div>
          <div className="meme__form-control">
            <div className="meme__form-wrapper form-actions">
              <UploadButton setSelectedImage={setSelectedImage}/>
                <button 
                    onClick={this.onSaveHandler}
                    ref={node => this.save__button = node}
                >
                Save Meme
                </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MemePanel;
