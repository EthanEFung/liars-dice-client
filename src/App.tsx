import React from 'react';
import { Link, Outlet } from 'react-router-dom'
import './App.css';
import { useGoSocket } from './contexts/GoSocket';
import { useWS } from './hooks'

function App() {
  /*
    using lower level hooks here so that we can listen
    into the websocket open event and emit the 'connect' event
  */
  const goSocket = useGoSocket()
  const send = useWS({
    websocket: goSocket,
    onOpen: () => {
      console.log('opening connections')
      send({type: 'connect', payload: null})
    },
  })
  return (
    <div className="App">
      <nav>
        <Link to="/">Lobby</Link>
      </nav>
      <Outlet />
      </div>
  )
}

export default App;
