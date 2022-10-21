const express = require('express')
const router = express.Router()

const ChatController = require('../controllers/ChatController');

router.get('/chat/:id', ChatController.getChatById);
router.post('/chat', ChatController.newChat);
router.delete('/chat/:id', ChatController.deleteChat);

module.exports = router