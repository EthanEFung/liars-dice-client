/*
  For authentication ultimately we want to weed out the bots
  this would probably require something like auth0 or firebase
  for expirimentation, it would be nice to try firebase.

  For now, lets just make sure that the user gives us a username.
  Later on we'll want to make sure that the user also is not just
  creating a ton of users to ddos us
*/
import React from 'react';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import { initializeApp } from 'firebase/app';

interface State {
  username: string | null
}

const Context = React.createContext<State | null>(null)

initializeApp({
  apiKey: process.env.REACT_APP_FB_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  appId: process.env.REACT_APP_FB_APP_ID,
})
const auth = getAuth()

function AuthProvider(props: React.PropsWithChildren<unknown>) {
  const [{username}, setState] = React.useState<{username: string | null}>({ username: null })
  React.useEffect(() => {
    signInAnonymously(auth).then(() => {
      console.log('signed in')
    }).catch((err) => {
      console.error(err)
    })
  }, [])
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((token) => {
          console.log({token, length: token.length})
          setState({ username: token })
        })
      } else {
        console.log('signed out')
      }
    })
  }, [])
  return <Context.Provider value={{
    username,
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