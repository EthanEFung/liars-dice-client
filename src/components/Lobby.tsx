import { useHubState } from 'contexts/Hub';
import React from 'react';
import { Link } from "react-router-dom";

export default function Lobby() {
  const {rooms} = useHubState()
  return <main>
    <Link to="create">Create Room</Link>
    <pre>{JSON.stringify(rooms, null, 2)}</pre>
  </main>
}
