const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/user', UserController.getAllUsers);
router.get('/user/:id', UserController.getUserById);
router.patch('/addfriend/:id', UserController.addFriend);
router.delete('/deletefriend/:id', UserController.deleteFriend);

module.exports = router