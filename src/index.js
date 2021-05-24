import React from 'react';
import { render } from 'react-dom';
import './assets/stylesheets/style.css';

// External Components
import ChatUI from './components/ChatUI';

function App() {
  return (<ChatUI />);
}

render(<App />, document.getElementById('root'));
