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
const UserRoute = require('./routes/User');
app.use('/', UserRoute);

const ChatRoute = require('./routes/Chat');
app.use('/', ChatRoute);

// SOCKET.IO SETUP
const {Server} = require("socket.io");

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3002",
        methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    },
});
const Chat = require('./models/Chat')
const User = require('./models/User')

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("create_chat", () => {
        const chat = new Chat()
        chat.save().then(res => io.emit('chat_created', res))
    })

    socket.on("join_room", async ({chat_id, user2_id, user1_id}) => {
        let chat = await Chat.findById(chat_id);
        chat.users.push(user1_id, user2_id)
        chat.save()
        // socket.id?
        socket.join(chat_id);
        console.log(`User with id: ${socket.id} joined room: ${chat_id}`);
    });

    socket.on("send_message", async ({message, user_id, chat_id}) => {
        let chat = await Chat.findById(chat_id)
        chat.messages.push({
            message: message,
            user: user_id
        })
        chat.save()
        socket.to(chat_id).emit("receive_message", message);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});