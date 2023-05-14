import React, { useEffect, useRef, useState } from 'react';
import '../../../styles-scss/canvas.scss';
import { observer } from "mobx-react-lite";
import canvasState from "../../../store-mobx/canvasState";
import {useParams} from "react-router-dom";
import ModalUserName from "./ModalUserName";
import { onOpenSocket } from "../../../socket/open";
import { onMessageSocket } from "../../../socket/message";
import { initialSocket } from "../../../socket/initial";
import axios from "axios";

const Canvas = observer(() => {

  const canvasRef = useRef();
  const params = useParams();
  const [modal, setModal] = useState(true);

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    const ctx = canvasRef.current.getContext('2d');
    axios.get(`http://localhost:5000/image?id=${params.id}`)
      .then(res => {
        const img = new Image();
        img.src = res.data
        img.onload = () => {
          ctx.clearRect(0,0,canvasRef.current.width, canvasRef.current.height);
          ctx.drawImage(img,0,0,canvasRef.current.width,canvasRef.current.height);
        }
      })
  }, [])

  useEffect(() => {
    if (canvasState.username) {
      const socket = initialSocket(params.id);
      socket.onopen = () => {
        onOpenSocket(socket, params.id)
      }
      socket.onmessage = (event) => {
        onMessageSocket(event, canvasRef)
      }
    }
  }, [canvasState.username])

  function mouseUpHandler() {
    axios.post(`http://localhost:5000/image?id=${params.id}`, {img: canvasRef.current.toDataURL()})
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  return (
    <div className={"canvas"}>
      <ModalUserName modal={modal} setModal={setModal}/>
      <canvas onMouseUp={mouseUpHandler} onMouseDown={() => canvasState.pushToUndo(canvasRef.current.toDataURL())} ref={canvasRef} width={800} height={600}></canvas>
    </div>
  );

})

export default Canvas;
