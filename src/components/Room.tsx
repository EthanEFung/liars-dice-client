import { useEffect } from 'react';
import { useAuth } from 'contexts/Auth';
import { useGoSocket } from 'contexts/GoSocket';
import { useWS } from 'hooks';
import { useParams } from 'react-router-dom';

function Room() {
  /* upon mount send to the hub a join */
  const { username } = useAuth()
  const goSocket = useGoSocket()
  const send = useWS({ websocket: goSocket })
  const { room: roomname } = useParams()
  useEffect(() => {
    if (!send || !roomname || !username) {
      return
    }
    const payload = { roomname, username }
    send({ type: 'join', payload })
    return () => {
      send({ type: 'leave', payload })
    }
  }, [send, roomname, username])
  
  return <div>
    <h1>{roomname}</h1>
  </div>
}

export default Room;