const { Request, Response } = require('express');
const path = require('path');
const multer = require('multer');
const UserModel = require('../models/user');


// Set up the storage configuration for multer
const storage = multer.diskStorage({
  destination: 'public/asset/userImages',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

// Create the multer instance with the storage configuration
const upload = multer({ storage });

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Create a new user with image upload
const createUser = async (req, res) => {
  upload.single('photo')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'Image upload failed' });
    }
    const { firstName, lastName, phone, password } = req.body;

    try {
      const newUser = await UserModel.create({
        firstName,
        lastName,
        phone,
        password,
        photo: req.file ? req.file.path : 'default-image-path.jpg',
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  });
};


// Update a user
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, phone, password } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.password = password;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid login credentials' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to login user' });
  }
};

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }
    const user = await UserModel.create({ email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser, loginUser, registerUser };