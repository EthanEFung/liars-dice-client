import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './index.css';
import { GoProvider } from './contexts/GoSocket';
import { AuthProvider, AuthConsumer } from './contexts/Auth'
import { HubProvider } from 'contexts/Hub';
import Auth from 'components/Auth'
import Lobby from 'components/Lobby';
import Create from 'components/Create';
import Room from 'components/Room';
import reportWebVitals from './reportWebVitals';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AuthConsumer>
          {({username}) => username != null ? (
            <GoProvider>
              <HubProvider>
                  <Routes>
                    <Route path="/" element={<App />}>
                      <Route path="create" element={<Create />} />
                      <Route path="/:room" element={<Room />} />
                      <Route path="/" element={<Lobby />} />
                    </Route>
                  </Routes>
              </HubProvider>
            </GoProvider>
          ) : (
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route path="*" element={<Navigate replace to="/" />}></Route>
            </Routes>
          )}
        </AuthConsumer>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
