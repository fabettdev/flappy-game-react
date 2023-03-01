import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/common.css';
import EntryApp from './screens/Game';
import Routing from './routing/Routing';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routing />
  </BrowserRouter>

);