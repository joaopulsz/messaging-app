// SERVER SETUP
const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");

app.use(cors());

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// SOCKET.IO SETUP
const {Server} = require("socket.io");

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    },
});

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    })
});