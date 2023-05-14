import { makeAutoObservable } from "mobx";

class CanvasState {
  canvas=null;
  socket = null;
  sessionId = null;
  undoList = [];
  redoList = [];
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

  pushToUndo(data) {
    console.log('push undo')
    this.undoList.push(data);
  }

  pushToRedo(data) {
    this.redoList.push(data);
  }

  undo() {
    let ctx = this.canvas.getContext('2d');
    if (this.undoList.length > 0) {
      console.log('undo')
      let dataURL = this.undoList.pop();
      this.redoList.push(this.canvas.toDataURL());
      let img = new Image();
      img.src = dataURL;
      img.onload = () => {
        ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        ctx.drawImage(img, 0,0,this.canvas.width,this.canvas.height)
      }
    }
  }

  redo() {
    let ctx = this.canvas.getContext('2d');
    if (this.redoList.length > 0) {
      console.log('redo')
      let dataURL = this.redoList.pop();
      this.undoList.push(this.canvas.toDataURL());
      let img = new Image();
      img.src = dataURL;
      img.onload = () => {
        ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        ctx.drawImage(img, 0,0,this.canvas.width,this.canvas.height)
      }
    }
  }

}

export default new CanvasState();
