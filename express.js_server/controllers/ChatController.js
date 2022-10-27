// save messages to database 
// retrieve chats from database 
const Chat = require('../models/Chat')

const getChatById = async (req, res) => {
    let chatId = req.params.id;
    let chat; 
    try {
        chat = await Chat.findById(chatId).populate('users', '_id username');
        res.json(chat);
    } catch (err){
        res.status(404).json({
            message: 'Chat not found'
        })
    }
}

const getAllChats = async(req, res) => {
    try {
        const chats = await Chat.find().populate('users', '_id username');
        res.status(200).json(chats);
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const newChat = async (req, res) => {
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

const deleteChat = async (req, res) => {
    let chatId = req.params.id;
    let chat; 
    try {
        chat = await Chat.findById(chatId);
        chat.remove();
        res.status(410).json();
    } catch (err){
        res.status(404).json({
            message: 'Chat not found'
        })
    }
}

module.exports = {getChatById, newChat, deleteChat, getAllChats}
