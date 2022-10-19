// SERVER SETUP
const express = require('express');

const app = express();

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// SOCKET.IO SETUP
const socket = require("socket.io");

const io = socket(server);

io.on("connection", function (socket) {
    console.log("Made socket connection");
});