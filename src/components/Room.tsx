import { useEffect } from 'react';
import { useGoSocket } from 'contexts/GoSocket';
import { useWS } from 'hooks';
import { useParams } from 'react-router-dom';

function Room() {
  /* upon mount send to the hub a join */
  const goSocket = useGoSocket()
  const send = useWS({ websocket: goSocket, messageHandler: (event) => {
    console.log(event)
  } })
  const { room: roomname } = useParams()
  useEffect(() => {
    if (!send || !roomname) {
      return
    }
    send({ type: 'join', payload: roomname })
    return () => {
      send({ type: 'left', payload: roomname })
    }
  }, [send, roomname])
  
  return <div>
    <h1>{roomname}</h1>
  </div>
}

export default Room;