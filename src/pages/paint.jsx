import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { socket } from "../socket";
import {
  connect,
  draw,
  emitDraw,
  emitErase,
  erase,
  getImage,
  joinRoom,
  moveTo,
  setImageData,
} from "../helper/helper";
import Copy from "../components/Copy";
import StrokeWidth from "../components/StrokeWidth";
import ColorPicker from "../components/ColorPicker";
import Tools from "../components/Tools";

function Paint({ params }) {
  let roomID = params.roomID;
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [strokeProps, setStrokeProps] = useState({
    lineWidth: 5,
    strokeStyle: "#ff0000",
  });
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const boundingRef = useRef(null);

  let onMouseDown = (event) => {
    let point = {
      x: event.pageX - boundingRef.current.x,
      y: event.pageY - boundingRef.current.y,
    };
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(point.x, point.y);
    moveTo(point, roomID);
    canvasRef.current.setPointerCapture(event.pointerId);
    setIsMouseDown(true);
  };

  let onMouseUp = (event) => {
    setImageData(canvasRef.current, roomID);
    setIsMouseDown(false);
    canvasRef.current.releasePointerCapture(event.pointerId);
  };

  let callEmitDraw = (event) => {
    let point = {
      x: event.pageX - boundingRef.current.x,
      y: event.pageY - boundingRef.current.y,
    };
    if (isMouseDown) {
      if (isErasing) {
        erase(ctxRef.current, point);
        emitErase(point, roomID);
      } else {
        draw(ctxRef.current, point);
        emitDraw(point, roomID, JSON.stringify(strokeProps));
      }
    }
  };

  useEffect(() => {
    canvasRef.current.width = canvasRef.current.clientWidth;
    canvasRef.current.height = canvasRef.current.clientHeight;
    if (!socket.connected) {
      connect();
    }
    joinRoom(roomID);
    getImage(roomID);
  }, []);
  useEffect(() => {
    let ctx = canvasRef.current.getContext("2d");
    ctxRef.current = ctx;
    ctx.imageSmoothingEnabled = true;
    boundingRef.current = canvasRef.current.getBoundingClientRect();
    ctx.lineWidth = strokeProps.lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = strokeProps.strokeStyle;

    socket.on("draw", ({ point, currentStrokeProps }) => {
      currentStrokeProps = JSON.parse(currentStrokeProps);
      ctx.lineWidth = currentStrokeProps.lineWidth;
      ctx.strokeStyle = currentStrokeProps.strokeStyle;
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
      ctx.lineWidth = strokeProps.lineWidth;
      ctx.strokeStyle = strokeProps.strokeStyle;
    });

    socket.on("erase", ({ point }) => {
      ctx.fillStyle = "white";
      ctx.rect(point.x - 50, point.y - 50, 100, 100);
      ctx.fill();
    });
    socket.on("moveTo", (point) => {
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
    });

    socket.on("set_image", (imageData) => {
      console.log(imageData);
      let img = new Image();
      img.src = imageData;
      img.onload = function () {
        ctx.drawImage(img, 0, 0);
      };
    });
  }, [strokeProps]);

  useEffect(() => {
    canvasRef.current.addEventListener("pointermove", callEmitDraw);
    canvasRef.current.addEventListener("pointerdown", onMouseDown);
    canvasRef.current.addEventListener("pointerup", onMouseUp);
    return () => {
      canvasRef.current.removeEventListener("pointerdown", onMouseDown);
      canvasRef.current.removeEventListener("pointermove", callEmitDraw);
      canvasRef.current.removeEventListener("pointerup", onMouseUp);
    };
  }, [isMouseDown, onMouseDown]);
  return (
    <div className="container">
      <canvas ref={canvasRef}></canvas>
      <div className="customise">
        <Copy id={roomID}></Copy>
        <StrokeWidth setStrokeProps={setStrokeProps} />
        <ColorPicker setStrokeProps={setStrokeProps} />
        <Tools setIsErasing={setIsErasing}/>
      </div>
    </div>
  );
}

export default Paint;
