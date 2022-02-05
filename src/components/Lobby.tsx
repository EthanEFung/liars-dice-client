import { useHubState } from 'contexts/Hub';
import { Link } from "react-router-dom";

export default function Lobby() {
  const {rooms} = useHubState()
  return <main>
    <Link to="create">Create Room</Link>
    {rooms.map((room) => {
      return <Link key={room} to={room}>{room}</Link>
    })}
  </main>
}
