import { nanoid } from "nanoid";
import { Server } from "socket.io";
const io = new Server({
  cors: {
    origin: ["http://localhost:5173"],
  },
});

let rooms = {};
io.on("connection", (socket) => {
  socket.on("join_room", (roomID) => {
    console.log(roomID);
    socket.join(roomID);
    rooms[roomID] ? rooms[roomID].counter++ : (rooms[roomID] = { counter: 1 });
  });

  socket.on("create_room", () => {
    let roomID = nanoid(10);
    rooms[roomID] = { counter: 1, imageData: null };
    socket.emit("new_room", roomID);
  });

  socket.on("get_image", (roomID) => {
    socket.emit("set_image", rooms[roomID].imageData);
  });

  socket.on("draw", ({ point, roomID, strokeProps }) => {
    socket
      .to(roomID)
      .emit("draw", { point: point, currentStrokeProps: strokeProps });
  });

  socket.on("erase", ({ point, roomID }) => {
    socket.to(roomID).emit("erase", { point: point });
  });

  socket.on("set_image", ({ imageData, roomID }) => {
    rooms[roomID] ? (rooms[roomID].imageData = imageData) : null;
  });
  socket.on("moveTo", ({ point, roomID }) => {
    socket.to(roomID).emit("moveTo", point);
  });
});

io.listen(3000);
