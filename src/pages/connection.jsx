import { useEffect } from "react";
import { connect, createRoom } from "../helper/helper";
import { useRef } from "react";
import { useLocation } from "wouter";
import { socket } from "../socket";

const Connection = () => {
  const roomRef = useRef(null);
  const [_, navigate] = useLocation();
  useEffect(() => connect(), []);

  return (
    <div className="container">
      <div className="input_container">
        <button
          type="button"
          onClick={() => {
            createRoom();
            socket.on("new_room", (roomID) => {
              navigate(`/draw/${roomID}`);
            });
          }}
        >
          Create Room
        </button>
        <input type="text" ref={roomRef}></input>
        <button
          type="button"
          onClick={() => navigate(`/draw/${roomRef.current.value}`)}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Connection;
