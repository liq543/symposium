// Import Apollo GraphQL
import { gql } from '@apollo/client';

// Query to GET one user
export const QUERY_USER = gql`
    query getUser {
        user {
            _id
            username
            email
            password
        }
    }
`;

// Query to GET all playlists
export const QUERY_PLAYLISTS = gql`
    query getAllPlaylists {
        playlists {
            _id
            playlistName
        }
    }
`;

// Query to GET only one playlist by its ID
export const QUERY_PLAYLIST = gql`
    query getOnePlaylist {
        playlist(_id: $id) {
            _id
            playlistName
        }
    }
`;

// Query to GET all songs
export const QUERY_SONGS = gql`
    query getAllSongs {
        songs {
            _id
            title
            artist
            album
        }
    }
`;

// Query to GET 
export const QUERY_SONG = gql`
    query getOneSong {
        song(_id: $id) {
            _id
            title
            artist
            album
        }
    }
`;