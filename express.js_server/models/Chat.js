const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    users: [{
        type: Schema.ObjectId, ref:"User"
    }],
    messages: [
    {
        message: String,
        user: {type: Schema.ObjectId, ref: "User"},
        created: {type:Date, default:Date.now}
    }
   ]
}, {timestamps: true})

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;