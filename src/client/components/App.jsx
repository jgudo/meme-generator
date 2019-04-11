import React from 'react';
import MemeProvider from './provider/MemeProvider';

import MemeListSlider from './meme/MemeListSlider';
import MemePanel from './meme/MemePanel';
import Navigation from './layout/Navigation';

const App = () => (
  <MemeProvider>
    <Navigation />
    <div className="meme__content">
      <MemeListSlider />
      <MemePanel />
    </div>
  </MemeProvider>
);

export default App;
