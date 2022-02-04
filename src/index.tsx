import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { GoProvider } from './contexts/GoSocket';
import App from './App';
import Lobby from './components/Lobby';
import Create from './components/Create';
import reportWebVitals from './reportWebVitals';
import { HubProvider } from 'contexts/Hub';

ReactDOM.render(
  <React.StrictMode>
    <GoProvider>
      <HubProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="create" element={<Create />} />
              <Route path="/:room" element={<div>Room</div>} />
              <Route path="/" element={<Lobby />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </HubProvider>
    </GoProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
