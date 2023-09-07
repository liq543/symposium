// Requires Mongoose to interact with MongoDB
const mongoose = require('mongoose');

// Requires the Schema to set up the model
const { Schema } = mongoose;

// Constructs the Song Schema to include title, artist, and album
const songSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  artist: {
    type: String,
    required: true,
    trim: true
  },
  album: {
    type: String,
    trim: true
  }
});

// Creates the Song model
const Song = mongoose.model('Song', songSchema);

module.exports = Song;
