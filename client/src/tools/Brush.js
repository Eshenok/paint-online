import Tool from "./Tool";

export default class Brush extends Tool {

  /*Наследуем от Tool constr и вызываем в нем прослушку*/
  constructor () {
    super();
    this.listen();
  }

  /*Action прослушки 3 вариантов мыши*/
  listen() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
    this.socket.send(JSON.stringify({
      method: "draw",
      id: this.id,
      figure: {
        type: 'finish',
      }
    }))
  }

  mouseDownHandler(e) {
    this.mouseDown = true;
    /*Начало рисования*/
    this.ctx.beginPath();
    /*Задаем начальную точку*/
    this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      /*Слушаем при каждом движении новые точки*/
      // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
      this.socket.send(JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: 'brush',
          x: e.pageX - e.target.offsetLeft,
          y: e.pageY - e.target.offsetTop,
          strokeColor: this.ctx.strokeStyle,
          fillColor: this.ctx.fillStyle,
          lineWidth: this.ctx.lineWidth,
        }
      }))
    }
  }

  static draw(ctx, x, y) {
    /*Вызов рисования линии*/
    ctx.lineTo(x, y);
    /*Обводка линии, иначе она будет пустая*/
    ctx.stroke();
  }
}
