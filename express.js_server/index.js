// SERVER SETUP
const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chatapp') //connect to db
const db = mongoose.connection
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('Connected to database'))

app.use(cors());
app.use(express.json())


const PORT = process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
// ROUTES
const AuthRoute = require('./routes/Auth');
app.use('/', AuthRoute);

const ChatRoute = require('./routes/Chat');
app.use('/Chat', ChatRoute);

// SOCKET.IO SETUP
const {Server} = require("socket.io");

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3002",
        methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    },
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with id: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});