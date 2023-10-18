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
        // const token = localStorage.getItem('spotify_access_token');
        try {
            const response = await axios.get(`/api/songs/`, {

            });
            console.log(response);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    };

    return (
        <div className="relative mt-5 mb-6">
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
                                    title: song.title,
                                    artist: song.artist,
                                    albumCover: song.albumImage,
                                    duration: song.duration
                                });
                                setSearchResults([]);  // This will clear the search results and close the dropdown
                            }}
                        >
                            {song.title} - {song.artist}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchComponent;
