import React, { PropsWithChildren } from 'react'

const Context = React.createContext<WebSocket | null>(null)

function GoProvider(props: PropsWithChildren<unknown>) {
  const websocket = React.useMemo(() => new WebSocket("ws://"+window.location.hostname+":8080"), [])
  React.useEffect(() => {
    if (!websocket) {
      return
    }
    return () => websocket.close()
  }, [websocket])
  return <Context.Provider {...props} value={websocket}></Context.Provider>
}

function useGoSocket(): WebSocket {
  const context = React.useContext(Context)
  if (context === null) {
    throw new Error("Attempted to access the go socket without declaring wrapping the child component in the GoProvider")
  }
  return context
}

export { useGoSocket, GoProvider }