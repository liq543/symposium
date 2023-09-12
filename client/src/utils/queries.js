import { gql } from '@apollo/client';

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

export const QUERY_PLAYLISTS = gql`
    query getAllPlaylists {
        playlists {
            _id
            playlistName
        }
    }
`;

export const QUERY_PLAYLIST = gql`
    query getOnePlaylist {
        playlist(_id: $id) {
            _id
            playlistName
        }
    }
`;

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