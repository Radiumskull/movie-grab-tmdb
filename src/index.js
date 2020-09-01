import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { StateProvider } from './config/StateProvider';
import { BrowserRouter as Router } from  'react-router-dom';
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <StateProvider>
      <Router>
        <App />
      </Router>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


