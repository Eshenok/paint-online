import canvasState from "../store-mobx/canvasState";

export function onOpenSocket(socket, id) {
  socket.send(JSON.stringify({
    id,
    username: canvasState.username,
    method: 'connection'
  }))
}
