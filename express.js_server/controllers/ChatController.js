// save messages to database 
// retrieve chats from database 
const Chat = require('../models/Chat')

//get chat by id - by two users' id  

const getChatById = async (req, res, next) => {
    let chatId = req.params.id;
    let chat; 
    try {
        chat = await Chat.findById(chatId);
        if (!chat) {
            res.status(404).json({
                message: 'Chat not found'
            })
        }
    } catch (err){
        res.status(500).json({
            message: err.message
        })
    }
    res.chat = chat;
}

const newChat = async (req, res, next) => {
    let chat = new Chat({
        users: [req.body.user1, req.body.user2],
        messages: []
    })
    try {
        const newChat = await chat.save();
        res.status(201).json(newChat);
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

module.exports = {getChatById, newChat}
