import { drawHandler } from "../components/Canvas/helpers/drawHandler";

export function onMessageSocket(event, canvasRef) {
  let msg = JSON.parse(event.data);
  switch (msg.method) {
    case "connection":
      console.log(`Пользователь ${msg.username} подключился`)
      break
    case "draw":
      drawHandler(msg, canvasRef);
      break
  }
}
