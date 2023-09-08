import React, { useState } from 'react';
import axios from 'axios';

const Sidebar = ({ onSongSelect }) => {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value) {
            fetchSongs(e.target.value);
        } else {
            setSearchResults([]); // Clear results when input is empty
        }
    };

    const fetchSongs = async (query) => {
        const token = localStorage.getItem('spotify_access_token'); // Assuming you have stored token in local storage
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

    return (
        <div className="w-1/4 space-y-6 pr-6">
            <input 
                type="text" 
                placeholder="Search for music..."
                value={search}
                onChange={handleSearchChange}
                className="w-full p-4 rounded-full outline-none" 
                style={{ backgroundColor: '#4F518C' }} 
            />
            {searchResults.length > 0 && (
                <div className="rounded overflow-y-auto max-h-60" style={{ backgroundColor: '#3F408C' }}>
                    {searchResults.map((song, index) => (
                        <div 
                            key={index} 
                            className="text-lg p-3 hover:bg-DABFFF rounded-lg cursor-pointer"
                            onClick={() => onSongSelect({
                                title: song.name,
                                artist: song.artists[0].name,
                                albumCover: song.album.images[0].url,
                                uri: song.uri,
                                duration: song.duration_ms
                            })}
                        >
                            {song.name} - {song.artists[0].name}
                        </div>
                    ))}
                </div>
            )}
            <h2 className="text-2xl font-bold mb-4">Your Playlists</h2>
            <div className="text-lg p-3 hover:bg-DABFFF rounded-lg cursor-pointer">Chill Vibes</div>
            {/* Add more playlists similarly */}
        </div>
    );
};

export default Sidebar;
