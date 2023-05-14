import { makeAutoObservable } from "mobx";

class CanvasState {
  canvas=null;
  socket = null;
  sessionId = null;
  username = "";

  constructor () {
    makeAutoObservable(this)
  }

  setCanvas(canvas) {
    this.canvas = canvas;
  }

  setSocket(socket) {
    this.socket = socket;
  }

  setSessionId(id) {
    this.sessionId = id;
  }

  setUserName(name) {
    this.username = name;
  }

}

export default new CanvasState();
