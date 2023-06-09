const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

// Create and Save a new User
exports.registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      photo: req.file ? path.join('asset', 'userImages', req.file.filename) : User.image,
      password: hashedPassword
    });

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error){
    console.log(error);
    res.status(400).send('error while creating user');
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  const user = await User.findOne({email: req.body.email});

  if(user == null) {
    return res.status(400).send('User not found');
  }

  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET);
      res.json({ accessToken: accessToken });
    } else {
      res.send('Not Allowed');
    }
  } catch(error) {
    console.log(error);
    res.status(500).send();
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  const users = await User.find({});
  res.send(users);
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if(user == null) {
    return res.status(404).send('Cannot find user');
  }
  res.send(user);
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(user == null) {
      return res.status(404).send('Cannot find user');
    }

    if(req.body.password != null) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }
    
    if(req.file) {
      // remove old image if it exists
      if (user.photo) {
        const oldImagePath = path.join(__dirname, '..', 'public', user.photo);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      // update with new image
      user.photo = path.join('asset', 'userImages', req.file.filename);
    }

    const updatedUser = await user.save();
    res.send(updatedUser);

  } catch(error) {
    console.log(error);
    res.status(400).send('Error updating user');
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(user == null) {
      return res.status(404).send('Cannot find user');
    }

    // remove image if it exists
    if (user.photo) {
      const imagePath = path.join(__dirname, '..', 'public', user.photo);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await User.remove(user);
    res.send('User deleted');

  } catch (e){
    console.log(e);
    res.status(500).send();
  }
};
