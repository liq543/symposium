// Requires Mongoose to interact with MongoDB
const mongoose = require('mongoose');

// Requires the Schema to set up the model and the Song model to populate the list of playlists
const { Schema } = mongoose;
const Song = require('./Song');

// Constructs the Playlist Schema to include playlist name and the playlist's songs
const playlistSchema = new Schema({
  playlistName: {
    type: String,
    required: true,
    trim: true
  },
  songs: [Song.schema]
});

// Creates the Playlist model
const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
