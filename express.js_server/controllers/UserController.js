const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
        if (err) {
            res.status(500).json({
                message: err.message
            })
        }
        let user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })
        user.save()
            .then(user => {
                res.status(201).json(user)
            })
            .catch(error => {
                res.json({
                    message: 'An error occured.'
                })
            })
    })
}

const login = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({ $or: [{ email: username }, { username: username }] })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        res.status(500).json({
                            message: err.message
                        })
                    }
                    if (result) {
                        // let token = jwt.sign({name: user.username}, 'password', {expiresIn: '1h'});
                        res.status(200).json(
                            user
                            // token
                        )
                    } else {
                        res.status(401).json({
                            message: "Password does not match."
                        })
                    }
                })
            } else {
                res.status(404).json({
                    message: 'No user found.'
                })
            }
        })
}

const getAllUsers = async(req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const getUserById = async (req, res) => {
    let userId = req.params.id;
    console.log(userId)
    let user;
    try {
        user = await User.findById(userId);
        res.json(user);
    } catch (err) {
        res.status(404).json({
            message: 'User not found'
        })
    }
}

const addFriend = async (req, res) => {
    
    let username = req.body.username;
    
    try {
        let loggedInUser = await User.findById(req.params.id);
        const user = await User.findOne({ $or: [{ email: username }, { username: username }] })
        if (user && loggedInUser) {
            loggedInUser.friends.push(user);
            loggedInUser.save();
            user.friends.push(loggedInUser);
            user.save();
            res.status(200).json({
                message: "Friend successfully added."
            })
        }
    } catch (err) {
        res.status(400).json({
            message: "User not found."
        })
    }
}

const deleteFriend = async (req, res) => {
    let username = req.body.username;
    
    try {
        let loggedInUser = await User.findById(req.params.id);
        const user = await User.findOne({ $or: [{ email: username }, { username: username }] })
        if (user && loggedInUser) {
            loggedInUser.friends.splice(loggedInUser.friends.indexOf(user), 1);
            loggedInUser.save();
            user.friends.splice(user.friends.indexOf(loggedInUser), 1);
            user.save();
            res.status(200).json({
                message: "Friend successfully removed."
            })
        }
    } catch (err) {
        res.status(400).json({
            message: "User not found."
        })
    }
}

module.exports = { register, login, getAllUsers, getUserById, addFriend, deleteFriend }