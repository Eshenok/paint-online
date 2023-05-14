import Tool from "./Tool";

export default class Rect extends Tool {
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
        type: 'rect',
        x: this.startX,
        y: this.startY,
        width: this.width,
        height: this.height,
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
      this.width = currentX - this.startX;
      this.height = currentY - this.startY

      this.draw(this.startX, this.startY, this.width, this.height);
    }
  }

  draw(x, y, w, h) {
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
      /*Вызов рисования Квадрата*/
      /*Принимает начало x и y, также ширину и высоту*/
      this.ctx.rect(x,y,w,h);
      /*Заполняем его*/
      this.ctx.fill();
      /*Добавляем обводку*/
      this.ctx.stroke();
    }
  }

  static staticDraw(ctx, x, y, w, h) {
    ctx.beginPath();
    /*Вызов рисования Квадрата*/
    /*Принимает начало x и y, также ширину и высоту*/
    ctx.rect(x,y,w,h);
    /*Заполняем его*/
    ctx.fill();
    /*Добавляем обводку*/
    ctx.stroke();
  }
}
