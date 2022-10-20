const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    friends: {
        type: Array
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema);

