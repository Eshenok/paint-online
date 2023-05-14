import canvasState from "../store-mobx/canvasState";

export default class Tool {

  /*Создаем елемент tool, который будет содержать ссылку на canvas и контекст  для работы рисовалки*/
  constructor () {
    this.canvas = canvasState.canvas;
    this.socket = canvasState.socket;
    this.id = canvasState.sessionId;
    this.ctx = canvasState.canvas.getContext('2d');
    /*При создании сначала мы вызовем уничтожение прослушки, а потом в потомках вызовем новую*/
    this.destroyEvents();
  }

  set fillColor(color) {
    this.ctx.fillStyle = color;
  }

  set strokeColor(color) {
    this.ctx.strokeStyle = color;
  }

  set lineWidth(width) {
    this.ctx.lineWidth = width;
  }

  static setDrawOptions(ctx, strokeColor, fillColor, lineWidth) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = fillColor;
  }

  /*При смене инструмента убираем прослушку, чтобы не было дубликатов*/
  destroyEvents() {
    this.canvas.onmouseup = null;
    this.canvas.onmousedown = null;
    this.canvas.onmousemove = null;
  }
}
