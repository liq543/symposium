// Requires the Apollo server for GraphQL
const { gql } = require('apollo-server-express');

// Establishes all typeDefs in GraphQL (Schemas, Authentication, Queries, and Mutations)
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    playlists: [Playlist]
  }

  type Playlist {
    _id: ID
    playlistName: String
    songs: [Song]
  }

  type Song {
    _id: ID
    title: String
    artist: String
    album: String
  }

  input SongInput {
    _id: ID
    title: String
    artist: String
    album: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    playlists: [Playlist]
    playlist(_id: ID!): Playlist
    songs(title: String, artist: String, album: String): [Song]
    song(_id: ID!): Song
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(username: String, email: String, password: String): User
    addPlaylist(playlistName: String!): Playlist
    updatePlaylistName(_id: ID!, playlistName: String!): Playlist
    addSongToPlaylist(_id: ID!, playlistName: String, songs: [SongInput]): Playlist
    removeSongFromPlaylist(_id: ID!, playlistName: String, songs: [SongInput]): Playlist
    deletePlaylist(_id: ID!): Playlist
  }
`;

module.exports = typeDefs;
