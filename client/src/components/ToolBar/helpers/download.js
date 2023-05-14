import canvasState from "../../../store-mobx/canvasState";

export const download = () => {
  const dataURL = canvasState.canvas.toDataURL();
  console.log(dataURL);
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = canvasState.sessionId + '.jpg';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
