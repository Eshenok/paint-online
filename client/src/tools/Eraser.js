import Brush from "./Brush";

export default class Eraser extends Brush {
  constructor () {
    super();
    console.log(this.ctx.strokeStyle)
  }

  draw(x, y) {
    /*Вызов рисования линии*/
    this.ctx.lineTo(x, y);
    /*Обводка линии, иначе она будет пустая*/
    this.ctx.strokeStyle = "white";
    console.log(this.ctx.strokeStyle)
    this.ctx.stroke();
  }

}
