import React from 'react';
import MemeProvider from './provider/MemeProvider';

import MemeList from './meme/MemeList';

const App = () => (
  <MemeProvider>
    <div>
      <h1>List of Popular Memes</h1>
      <MemeList />
  </div>
  </MemeProvider>
);

export default App;
