import Tool from "./Tool";

export default class Circle extends Tool {
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
        type: 'circle',
        x: this.startX,
        y: this.startY,
        r: this.r,
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
      let currentX = e.pageX - e.target.offsetLeft;
      let currentY = e.pageY - e.target.offsetTop;
      /*Расчет ширины и высоты*/
      let width = currentX - this.startX;
      let height = currentY - this.startY;
      this.r = Math.sqrt(width**2 + height**2);
      this.draw(this.startX, this.startY, this.r);
    }
  }

  draw(x, y, r) {
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
      /*Вызов рисования Круга*/
      /*Принимает начало x и y, также ширину и высоту*/
      this.ctx.arc(x,y, r, 0, 2 * Math.PI);
      /*Заполняем его*/
      this.ctx.fill();
      /*Добавляем обводку*/
      this.ctx.stroke();
    }
  }

  static staticDraw(ctx, x, y, r) {
    ctx.beginPath();
    /*Вызов рисования Круга*/
    /*Принимает начало x и y, также ширину и высоту*/
    ctx.arc(x,y, r, 0, 2 * Math.PI);
    /*Заполняем его*/
    ctx.fill();
    /*Добавляем обводку*/
    ctx.stroke();
  }
}
