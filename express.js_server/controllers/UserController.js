const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// allow signup and login
const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
        if (err) {
            res.json({
                error: err
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

const login = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({$or: [{email:username}, {username:username}]})
    .then(user => {
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.json({
                        error: err
                    })
                }
                if (result) {
                    let token = jwt.sign({name: user.usermame}, 'password', {expiresIn: '1h'});
                    res.json({
                        message: "Login successful.",
                        token
                    })
                } else {
                    res.json({
                        message: "Password does not match."
                    })
                }
            })
        } else {
            res.json({
                message: 'No user found.'
        })
        }
    })
}



module.exports = {register, login}