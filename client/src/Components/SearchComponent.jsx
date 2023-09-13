import React, { useState } from 'react';
import axios from 'axios';

const SearchComponent = ({ onSongSelect }) => {
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

    return (
        <div className="relative mt-5">
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
                    className="rounded-lg overflow-y-auto max-h-60 absolute w-full mt-1 border-t-0 border border-white border-opacity-20 z-10"
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
    );
};

export default SearchComponent;
