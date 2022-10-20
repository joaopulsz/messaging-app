const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    messages:{
        type: Array
    }
}, {timestamps: true})

const Chat = mongoose.model('Chat', chatSchema);