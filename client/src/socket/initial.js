import canvasState from "../store-mobx/canvasState";
import toolState from "../store-mobx/toolState";
import Brush from "../tools/Brush";

export function initialSocket(id) {
  const socket = new WebSocket(`ws://localhost:5000/`);
  canvasState.setSocket(socket);
  canvasState.setSessionId(id);
  toolState.setTool(new Brush());
  return socket;
}
