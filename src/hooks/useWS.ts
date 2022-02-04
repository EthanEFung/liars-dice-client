import React from 'react';
import noop from 'lodash/noop';

export type WebSocketEvent<Payload extends any> = {
  type: string,
  payload: Payload
}

interface WebSocketListener {
  (this: WebSocket, event: Event): any
}

export interface MessageHandler {
  (event: WebSocketEvent<unknown>): any
}

type UseWSParams = {
  websocket: WebSocket,
  onOpen?: WebSocketListener,
  onClose?: WebSocketListener,
  messageHandler?: MessageHandler,
  onError?: WebSocketListener,
}

export default function useWS({
  websocket,
  onOpen = noop,
  onClose = noop,
  messageHandler = noop,
  onError = noop,
}: UseWSParams) {
  const socketRef = React.useRef<WebSocket>(websocket)

  React.useEffect(() => {
    const socket = socketRef.current
    socket.addEventListener('open', onOpen)
    return () => socket.removeEventListener('open', onOpen) 
  }, [onOpen])

  React.useEffect(() => {
    const socket = socketRef.current
    socket.addEventListener('close', onClose)
    return () => socket.removeEventListener('close', onClose) 
  }, [onClose])

  React.useEffect(() => {
    const socket = socketRef.current
    const onMessage = function(event: MessageEvent) {
      messageHandler(JSON.parse(event.data))
    }
    socket.addEventListener('message', onMessage)
    return () => socket.removeEventListener('message', onMessage) 
  }, [messageHandler])

  React.useEffect(() => {
    const socket = socketRef.current
    socket.addEventListener('error', onError)
    return () => socket.removeEventListener('message', onError) 
  }, [onError])

  return React.useCallback(<Payload extends unknown>(event: WebSocketEvent<Payload>) => {
    const socket = socketRef.current
    if (!socket) {
      throw new Error('Attempted to send an event to a socket that is undefined')
    }
    socketRef.current?.send(JSON.stringify(event))
  }, [])

}