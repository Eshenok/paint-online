import Tool from "./Tool";

export default class Line extends Tool {
  constructor () {
    super();
    this.listen();
  }

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
        type: 'line',
        x: this.currentX,
        y: this.currentY,
        xStart: this.startX,
        yStart: this.startY,
        strokeColor: this.ctx.strokeStyle,
        fillColor: this.ctx.fillStyle,
        lineWidth: this.ctx.lineWidth,
      }
    }))
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
    /*Начальная точка рисования*/
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    /*Сохраняем изображение холста*/
    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      /*Слушаем при каждом движении новые точки*/
      /*Текущее положение мыши*/
      this.currentX = e.pageX - e.target.offsetLeft;
      this.currentY = e.pageY - e.target.offsetTop;
      /*Расчет ширины и высоты*/
      this.draw(this.currentX, this.currentY);
    }
  }

  draw(x, y) {
    /*Создаем изображение со всем что было на холсте*/
    const img = new Image();
    /*Передаем в него сохраненное изображение*/
    img.src = this.saved;
    /*При загрузке (асинх)*/
    img.onload = () => {
      /*Очищаем весь канвас*/
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      /*И сразу загружаем в него то, что было до попытки сделать rect*/
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(x, y);
      /*Добавляем обводку*/
      this.ctx.stroke();
    }
  }

  static staticDraw(ctx, x, y, startX, startY) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(x, y);
    /*Добавляем обводку*/
    ctx.stroke();
  }
}
