// Import Apollo GraphQL
import { gql } from '@apollo/client';

// Mutation for creating a new user
export const ADD_USER = gql`
    mutation addUser(username: String!, email: String!, password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
              _id
              username
              email
              password
            }
          }
    }
`;

// Mutation for logging in a user
export const LOGIN = gql`
    mutation login(email: String!, password: String!) {
        login(email: $email, password: $password) {
            token
            user {
              _id
              username
              email
              password
            }
          }
    }
`;

// Mutation for updating a user's username and/or email and/or password
export const UPDATE_USER = gql`
    mutation updateUser(username: String, email: String, password: String) {
        updateUser(username: $username, email: $email, password: $password) {
            _id
            username
            email
            password
        }
    }
`;

// Mutation for creating a new playlist
export const ADD_PLAYLIST = gql`
    mutation addPlaylist(playlistName: String!) {
        addPlaylist(playlistName: $playlistName) {
            _id
            playlistName
        }
    }
`;

// Mutation for updating a playlist's name
export const UPDATE_PLAYLIST_NAME = gql`
    mutation updatePlaylistName(_id: ID!, playlistName: String!) {
        updatePlaylistName(_id: $id, playlistName: $playlistName) {
            _id
            playlistName
        }
    }
`;

// Mutation for adding a song to a playlist
export const ADD_SONG_TO_PLAYLIST = gql`
    mutation addSongToPlaylist(_id: ID!, songs: [SongInput]) {
        addSongToPlaylist(_id: $id, songs: $songs) {
            _id
            playlistName
            songs {
              _id
              title
              artist
              album
            }
        }
    }
`;

// Mutation for removing a song from a playlist
export const REMOVE_SONG_FROM_PLAYLIST = gql`
    mutation removeSongFromPlaylist() {
        removeSongFromPlaylist(_id: $id, songs: $songs) {
            _id
            playlistName
            songs {
              _id
              title
              artist
              album
            }
        }
    }
`;

// Mutation for deleting a song from a playlist
export const DELETE_PLAYLIST = gql`
    mutation deletePlaylist() {
        deletePlaylist(_id: $id) {
            _id
            playlistName
            songs {
              _id
              title
              artist
              album
            }
        }
    }
`;
