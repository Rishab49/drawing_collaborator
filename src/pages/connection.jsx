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
    <div className="connection_container">
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
        <hr width="100%"></hr>
        <div className="join_container">
          <input type="text" ref={roomRef} placeholder="Enter the room ID"></input>
          <button
            type="button"
            onClick={() => navigate(`/draw/${roomRef.current.value}`)}
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default Connection;
