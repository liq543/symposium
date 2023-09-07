// Requires the AuthenticationError from Apollo, our models, and the sign token
const { AuthenticationError } = require('apollo-server-express');
const { User, Playlist, Song } = require('../models');
const { signToken } = require('../utils/auth');
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

// Establishes all resolvers based on the typeDefs in greater detail
const resolvers = {
  Query: {
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
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { products }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
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
    }
  }
};

module.exports = resolvers;
