// Requires Mongoose to interact with MongoDB
const mongoose = require('mongoose');

// Requires the Schema to set up the model, bcrypt to encrypt passwords, and the Playlist model to populate the list of playlists
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Playlist = require('./Playlist');

// Constructs the User Schema to include username, email, password, and the user's playlists
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Must match an email address!']
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  playlists: [Playlist.schema]
});

// Sets up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Compares the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Creates the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
