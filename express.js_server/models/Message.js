const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    user_id: {
        type: Number
    },
    message: {
        type: String
    },
    chat_id: {
        type: Number
    }
}, {timestamps: true})

const Message = mongoose.model('Message', messageSchema);