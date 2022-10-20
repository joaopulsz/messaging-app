import './App.css';
import io from 'socket.io-client';
import {useState} from "react";

const socket = io.connect("http://localhost:4000");

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
        socket.emit("join_room", room)
    } 
  };

  return (
    <div className="App">
      <h3>Join A Chat</h3>
      <input type="text" placeholder="Name" onChange={(event)=> {
        setUserName(event.target.value)
      }}/>
      <input type="text" placeholder="Room" onChange={(event) => {
        setRoom(event.target.value)
      }}/>
      <button onClick={joinRoom} >Join</button>
    </div>
  );
}

export default App;
