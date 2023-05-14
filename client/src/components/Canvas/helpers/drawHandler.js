import Brush from "../../../tools/Brush";
import Rect from "../../../tools/Rect";
import Circle from "../../../tools/Circle";
import Line from "../../../tools/Line";
import Tool from "../../../tools/Tool";

export const drawHandler = (msg, canvasRef) => {
  const figure = msg.figure;
  const ctx = canvasRef.current.getContext('2d');
  const {strokeStyle, fillStyle, lineWidth} = ctx;
  Tool.setDrawOptions(ctx, figure.strokeColor, figure.fillColor, figure.lineWidth);
  switch (figure.type) {
    case "brush":
      Brush.draw(ctx, figure.x, figure.y)
      Tool.setDrawOptions(ctx, strokeStyle, fillStyle, lineWidth);
      break
    case "rect":
      Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height);
      Tool.setDrawOptions(ctx, strokeStyle, fillStyle, lineWidth);
      break
    case "circle":
      Circle.staticDraw(ctx, figure.x, figure.y, figure.r);
      Tool.setDrawOptions(ctx, strokeStyle, fillStyle, lineWidth);
      break
    case "line":
      Line.staticDraw(ctx, figure.x, figure.y, figure.xStart, figure.yStart);
      Tool.setDrawOptions(ctx, strokeStyle, fillStyle, lineWidth);
      break
    case "finish":
      ctx.beginPath();
      break
  }
}
