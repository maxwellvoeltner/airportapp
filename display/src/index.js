import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AirplanesContextProvider } from './context/AirplaneContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AirplanesContextProvider>
      <App />
    </AirplanesContextProvider>
  </React.StrictMode>
);
