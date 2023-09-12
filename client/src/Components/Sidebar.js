import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/client';

const Sidebar = ({ onSongSelect, onPlaylistClick }) => {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const samplePlaylists = [
        {
            name: `Griffin's Cool Jams`,
            image: './images/palm.jpg',
            songs: ['3qPZlJAvV95TnC4kFgTvnA',
                    '6jEqBrapfygeEbxdVqMlvl',
                    '1qPDHJnx0JuDOE7QnpjtAd',
                    '2yNiL8SXT6xDcalxNmwJVj',
                    '5Ma1xPAUNkOz4q3Hg7THSI',
                    '1hRRp3uMap1ZfN7ulNal3T',
                    '7bpfZYrS4dQKxiuj6QiRaX',
                    '2T35zf0H3bFvUaNeeu5jDI'
            ]
        },
    ];
    

    
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value) {
            fetchSongs(e.target.value);
        } else {
            setSearchResults([]); // Clear results when input is empty
        }
    };

    const fetchSongs = async (query) => {
        const token = localStorage.getItem('spotify_access_token');
        try {
            const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=5`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSearchResults(response.data.tracks.items);
        } catch (error) {
            console.error('Error fetching songs from Spotify:', error);
        }
    };

    // Function that allows user to create a playlist when they click the "Add Playlist" button
    const createNewPlaylist = async () => {
        try {
            
        } catch {

        }
    }

    return (
        <div className="w-1/4 space-y-6 pr-6">
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Search for music..."
                    value={search}
                    onChange={handleSearchChange}
                    className="w-full p-4 rounded-full outline-none mb-2"
                    style={{ backgroundColor: '#4F518C' }} 
                />
                {searchResults.length > 0 && (
                    <div 
                        className="rounded-lg overflow-y-auto max-h-60 absolute w-full mt-1 border-t-0 border border-white border-opacity-20"
                        style={{ backgroundColor: '#3F408C' }}
                    >
                        {searchResults.map((song, index) => (
                            <div 
                                key={index} 
                                className="text-lg p-3 hover:bg-purple-700 rounded-lg cursor-pointer transition duration-300"
                                onClick={() => {
                                    onSongSelect({
                                        title: song.name,
                                        artist: song.artists[0].name,
                                        albumCover: song.album.images[0].url,
                                        uri: song.uri,
                                        duration: song.duration_ms
                                    });
                                    setSearchResults([]);  // This will clear the search results and close the dropdown
                                }}
                            >
                                {song.name} - {song.artists[0].name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <h2 className="text-2xl font-bold mb-4">Your Playlists</h2>
            {samplePlaylists.map((playlist, index) => (
                <div 
                    key={index} 
                    className="text-lg p-3 hover:bg-DABFFF rounded-lg cursor-pointer transition duration-300"
                    onClick={() => onPlaylistClick(playlist)}
                >
                    {playlist.name}
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
