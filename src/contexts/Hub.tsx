import React from 'react';
import { useWS } from 'hooks';
import { useGoSocket } from './GoSocket';

const DispatchContext = React.createContext<ReturnType<typeof useWS> | null>(null);

function DispatchProvider(props: React.PropsWithChildren<unknown>) {
  const websocket = useGoSocket()
  const send = useWS({ websocket })
  return <DispatchContext.Provider value={send} {...props}></DispatchContext.Provider>
}

function useHubDispatch() {
  const context = React.useContext(DispatchContext)
  if (context === null) {
    throw new Error('Attempted to use goWS Dispatch outside of the DispatchProvider')
  }
  return context 
}

interface State {
  rooms: string[]
}
interface Action {
  type: string;
  payload: unknown;
}
const StateContext = React.createContext<State | null>(null)

function StateProvider(props: React.PropsWithChildren<unknown>) {
  const websocket = useGoSocket()
  const [hub, dispatch] = React.useReducer((prev: State, action: Action) => {
    switch(action.type) {
      case 'rooms':
        return {
          ...prev,
          rooms: action.payload as string[] ?? []
        }
      default:
        return prev
    }
  }, { rooms: [] })
  function logAndDispatch(event: unknown) {
    console.log(event);
    dispatch(event as Action)
  }
  useWS({ websocket, messageHandler: logAndDispatch})
  return <StateContext.Provider value={hub} {...props}></StateContext.Provider>
}

function useHubState() {
  const context = React.useContext(StateContext);
  if (context === null) {
    throw new Error("attempting to access the state hub exteral to the HubProvider")
  }
  return context
}

function HubProvider(props: React.PropsWithChildren<unknown>) {
  return <StateProvider><DispatchProvider>{props.children}</DispatchProvider></StateProvider>
}

function useHub() {
  const state = useHubState()
  const dispatch = useHubDispatch()
  return [state, dispatch] as const
}

export { HubProvider, useHubDispatch, useHubState, useHub }