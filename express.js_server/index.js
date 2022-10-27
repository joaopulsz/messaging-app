// SERVER SETUP
const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chatapp'); //connect to db
const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('Connected to database'));

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
        origin: "*",
        methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    },
});

const Chat = require('./models/Chat');

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    let chatId;
    socket.on("create_chat", ({ user1_id, user2_id}) => {
        const chat = new Chat({
            users: [user1_id, user2_id],
            messages: []
        })
        chat.save().then(res => io.emit('chat_created', res));
    })
    
    socket.on("join_chat", (chat_id) => {
        console.log("joined chat", chat_id);
        // if(chatId) socket.leave(chatId);
        socket.join(chat_id);
        chatId = chat_id;
    });

    socket.on("change_chat", (chat_id) => {
        socket.leave(chatId);
        socket.join(chat_id);
    })

    socket.on("send_message", async ({message, user_id, chat_id, created}) => {
        console.log(message, user_id, chat_id, created);
        const chat = await Chat.findById(chat_id)
        const newMessage = {
            message: message,
            user: user_id,
            created: created
        } 
        chat.messages.push(newMessage)
        chat.save()

        socket.to(chat_id).emit("receive_message", chat.messages[chat.messages.length - 1]);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});