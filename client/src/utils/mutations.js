import { gql } from '@apollo/client';

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

export const ADD_PLAYLIST = gql`
    mutation addPlaylist(playlistName: String!) {
        addPlaylist(playlistName: $playlistName) {
            _id
            playlistName
        }
    }
`;

export const UPDATE_PLAYLIST_NAME = gql`
    mutation updatePlaylistName(_id: ID!, playlistName: String!) {
        updatePlaylistName(_id: $id, playlistName: $playlistName) {
            _id
            playlistName
        }
    }
`;

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

// I need help getting this to work correctly.
export const REMOVE_SONG_FROM_PLAYLIST = gql`
    mutation removeSongFromPlaylist() {

    }
`;

export const DELETE_PLAYLIST = gql`
    mutation deletePlaylist() {
        
    }
`;
