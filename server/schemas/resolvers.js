// Requires the AuthenticationError from Apollo, our models, and the sign token
const { AuthenticationError } = require('apollo-server-express');
const { User, Playlist, Song } = require('../models');
const { signToken } = require('../utils/auth');

// Establishes all resolvers based on the typeDefs in greater detail
const resolvers = {
  Query: {
    // Find all users in the database for testing purposes
    users: async () => {
      return await User.find();
    },
    
    // Finds a user by its ID, which should be run when a user successfully logs in
    user: async (parent, { _id }) => {
      return await User.findById(_id);
    },

    // Finds all playlists that the user has created so far, which should also be run when a user successfully logs in
    playlists: async () => {
      return await Playlist.find();
    },

    // Find a specific playlist by its ID and populates all songs that are in the playlist, which should be run when a user clicks on one of their playlists
    playlist: async (parent, { _id }) => {
      return await Playlist.findById(_id).populate('songs');
    },

    // Find all songs by title and/or artist and/or name, which should be run when a user navigates to the Search Page, enters this information in the Search Query component, and clicks on the Search button
    songs: async (parent, { title, artist, album }) => {
      const params = {};

      if (title) {
        params.title = title;
      }

      if (artist) {
        params.artist = artist;
      }

      if (album) {
        params.album = album;
      }

      return await Song.find(params);
    },

    // Find a song by its ID, which should be run when a user clicks on a song from either one of their playlists or from their search results
    song: async (parent, { _id }) => {
      return await Song.findById(_id);
    },
  },
  Mutation: {
    // Creates a new user and passes in their authentication token
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    
    // Login process that checks the user's credentials against their token
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    // Updates the user's credentials (username and/or email and/or password) while they're logged in
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },

    // Creates a playlist while the user is logged in
    addPlaylist: async (parent, args, context) => {
      if (context.user) {
        return await Playlist.create(args);
      }

      throw new AuthenticationError('Not logged in');
    },

    // Updates a playlist's name by it's ID while the user is logged in
    updatePlaylistName: async (parent, { _id, playlistName }, context) => {
      // console.log(playlistName);
      if (context.user) {
        return await Playlist.findByIdAndUpdate(_id, { playlistName: playlistName } , { new: true });
      }

      // throw new AuthenticationError('Not logged in');
    },

    // Adds a track to the end of a playlist by its ID while the user is logged in
    addSongToPlaylist: async (parent, { _id, songs }, context) => {
      if (context.user) {
        return await Playlist.findByIdAndUpdate(
          { _id: _id  }, 
          { $push: { songs: songs } },
          { new: true }
        );
      }

      // throw new AuthenticationError('Not logged in');
    },

    // Removes a track from the playlist by its ID while the user is logged in
    // TODO: Please fix this so that it works correctly.
    removeSongFromPlaylist: async (parent, { _id, songs }, context) => {
      // const songIndex = song.index;
      console.log(songs);

      if (context.user) {
        return await Playlist.findOneAndUpdate(
          { _id: _id }, 
          { $pull: { songs: { $in: songs } } },
          { new: true }
        );
      }

      // throw new AuthenticationError('Not logged in');
    },

    // Deletes a playlist while the user is logged in
    deletePlaylist: async (parent, args, context) => {
      if (context.user) {
        return await Playlist.deleteOne(args);
      }

      // throw new AuthenticationError('Not logged in');
    },
  }
};

module.exports = resolvers;
