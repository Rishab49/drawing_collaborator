import { socket } from "../socket";

export function connect() {
  socket.connect();
}

export function createRoom() {
  socket.emit("create_room");
}

export function joinRoom(roomID) {
  socket.emit("join_room", roomID);
}

export function emitDraw(point, roomID, strokeProps) {
  console.log(strokeProps);
  socket.emit("draw", {
    point: point,
    roomID: roomID,
    strokeProps: strokeProps,
  });
}

export function setImageData(ref, roomID) {
  let imageData = ref.toDataURL();
  socket.emit("set_image", { imageData: imageData, roomID: roomID });
}

export function draw(ctx, point) {
  ctx.lineTo(point.x, point.y);
  ctx.stroke();
}

export function emitErase(point, roomID) {
  socket.emit("erase", {
    point: point,
    roomID: roomID
  });
}


export function erase(ctx, point){
  ctx.fillStyle = "white";
  ctx.rect(point.x - 50,point.y-50,100,100);
  ctx.fill();
}

export function getImage(roomID) {
  socket.emit("get_image", roomID);
}

export function moveTo(point, roomID) {
  socket.emit("moveTo", { point: point, roomID: roomID });
}
