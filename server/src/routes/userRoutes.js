const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Get all users
router.get('/users', UserController.getUsers);

// Get a single user by ID
router.get('/users/:id', UserController.getUserById);

// Create a new user
router.post('/users', UserController.createUser);

// Update a user
router.put('/users/:id', UserController.updateUser);

// Delete a user
router.delete('/users/:id', UserController.deleteUser);

router.post('/users/login', UserController.loginUser);
router.post('/users/register', UserController.registerUser);
module.exports = router;
