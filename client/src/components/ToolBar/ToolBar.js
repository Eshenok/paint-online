import React from 'react';
import "../../styles-scss/toolbar.scss";
import toolState from "../../store-mobx/toolState";
import canvasState from "../../store-mobx/canvasState";
import Brush from "../../tools/Brush";
import Rect from "../../tools/Rect";
import Eraser from "../../tools/Eraser";
import Circle from "../../tools/Circle";
import Line from "../../tools/Line";
import { download } from "./helpers/download";

const ToolBar = () => {

  return (
    <div className={"toolbar"}>
      <button className={"toolbar__btn toolbar__btn_brush"} onClick={() => {toolState.setTool(new Brush())}}></button>
      <button className={"toolbar__btn toolbar__btn_rect"} onClick={() => {toolState.setTool(new Rect())}}></button>
      <button className={"toolbar__btn toolbar__btn_circle"} onClick={() => {toolState.setTool(new Circle())}}></button>
      <button className={"toolbar__btn toolbar__btn_eraser"} onClick={() => {toolState.setTool(new Eraser())}}></button>
      <button className={"toolbar__btn toolbar__btn_line"} onClick={() => {toolState.setTool(new Line())}}></button>
      <input type={"color"} onChange={e => toolState.setFillColor(e.target.value)} defaultValue={"black"}/>
      <button className={"toolbar__btn toolbar__btn_undo"} onClick={() => canvasState.undo()}></button>
      <button className={"toolbar__btn toolbar__btn_redo"} onClick={() => canvasState.redo()}></button>
      <button className={"toolbar__btn toolbar__btn_save"} onClick={download}></button>
    </div>
  );
};

export default ToolBar;
