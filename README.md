# Thoughts
## How are we to handle the websocket connection?
  1. We want 1 and only one websocket connection for the client.
  2. We want to have a useWS hook that can be reusuable in the sense that
    if we were to export the hook as a stand alone library, the developer
    would have the option of passing different websockets to the hook.
## How should we structure our application?
  1. the home page should be the "lobby" where the user will be able to either create a
    new game, or see the list of existing games and join one. We can use react router for
    to differientate between the the create form and the lobby.
  2. When a user is on the create form they should be able to submit their name, the name
    of the room, and potentially set a password. On submitting the form, they should be
    taken to the room.
## How should the room be structured?
  1. If the user is the host, they will be able to start a game as soon as at least one
    other player is present.
  2. Once the game play starts _all_ users in the room should be able to witness the game.
  3. If the user is _not_ the host, and the game has _not_ been started, then
    they will be able to sit, which adds them to the game active players.
  4. Once sitting all active players should be able to forfeit by leaving the room.
  5. If the host leaves however, the game ends, the users should be notified, and should
    be brought back to the lobby.

# Route Structure
- Lobby
    - Create Form
    - Room
    - (Future): Leaderboard

# Room Structure
  


    

    