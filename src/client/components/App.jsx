import React from 'react';
import MemeProvider from './provider/MemeProvider';

import MemeList from './meme/MemeList';
import MemePanel from './meme/MemePanel';
import Navigation from './layout/Navigation';

const App = () => (
  <MemeProvider>
    <Navigation />
    <div className="meme__content">
      <MemeList />
      <MemePanel />
    </div>
  </MemeProvider>
);

export default App;
