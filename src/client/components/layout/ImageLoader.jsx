import React, { Component } from 'react';

const _loaded = {};

class ImageLoader extends Component {
  static defaultProps = {
    className: '',
    loadingClassName: 'img-loading',
    loadedClassName: 'img-loaded'
  };

  state = {
    loaded: _loaded[this.props.src]
  };

  onLoad = () => {
    _loaded[this.props.src] = true;
    this.setState(() => ({ loaded: true }));
  };


  render() {
    let { 
      className, 
      loadedClassName, 
      loadingClassName, 
      ...props 
    } = this.props;

    className = `${className} ${this.state.loaded
      ? loadedClassName
      : loadingClassName}`;

    return (
      <img 
          className={className} 
          data-key={this.props.imgId}
          onClick={this.props.onClick} 
          onLoad={this.onLoad} 
          src={this.props.src} 
      />   
    );
  }
}

export default ImageLoader;