/*
  For authentication ultimately we want to weed out the bots
  this would probably require something like auth0 or firebase
  for expirimentation, it would be nice to try firebase.

  For now, lets just make sure that the user gives us a username.
  Later on we'll want to make sure that the user also is not just
  creating a ton of users to ddos us
*/
import React from 'react';

interface State {
  username: string | null
  setUsername: (name: string) => void
}

const Context = React.createContext<State | null>(null)
function AuthProvider(props: React.PropsWithChildren<unknown>) {
  const [{username}, setState] = React.useState<{username: string | null}>({ username: null })
  const setUsername = React.useCallback((name: string) => {
    setState((prev) => {
      return {...prev, username: name}
    })
  }, [setState])
  return <Context.Provider value={{
    username,
    setUsername
  }}>{props.children}</Context.Provider>
}

function useAuth() {
  const context = React.useContext(Context)
  if (context === null) {
    throw new Error("Attempted to access the useAuth hook external to AuthProvider")
  }
  return context
}

 function AuthConsumer(props: React.ConsumerProps<State>) {
  return <Context.Consumer>{
    (context) => {
      if (context === null) {
        throw new Error("Attempted to access the useAuth hook external to AuthProvider")
      }
      return props.children(context)
    }
  }</Context.Consumer>
}

export { AuthProvider, AuthConsumer, useAuth }