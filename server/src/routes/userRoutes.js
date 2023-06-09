const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Get all users
router.get('/users', UserController.getUsers);

// Get a single user by ID
router.get('/:id', UserController.getUserById);

// Update a user
router.put('/:id', UserController.updateUser);

// Delete a user
router.delete('/:id', UserController.deleteUser);

router.post('/login', UserController.loginUser);
router.post('/register', UserController.registerUser);
module.exports = router;
