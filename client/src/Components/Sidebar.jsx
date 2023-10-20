import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar({ onPlaylistClick }) {
    const navigate = useNavigate();
    
    const [playlists, setPlaylists] = useState([]);
    const [isAddingPlaylist, setIsAddingPlaylist] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [newPlaylistImageURL, setNewPlaylistImageURL] = useState('');
    const [newPlaylistDescription, setNewPlaylistDescription] = useState('');

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await fetch('/api/playlists'); // replace with your backend endpoint
                const data = await response.json();
                setPlaylists(data);
            } catch (error) {
                console.error('Error fetching playlists:', error);
            }
        };

        fetchPlaylists();
    }, []);
    
    const handleCreatePlaylist = () => {
        if (newPlaylistName.trim() === '' || newPlaylistImageURL.trim() === '' || newPlaylistDescription.trim() === '') {
            alert('Please fill out all fields!');
            return;
        }

        const newPlaylist = {
            name: newPlaylistName,
            image: newPlaylistImageURL,
            description: newPlaylistDescription,
            songs: []
        };

        setPlaylists(prevPlaylists => [...prevPlaylists, newPlaylist]);
        setNewPlaylistName('');
        setNewPlaylistImageURL('');
        setNewPlaylistDescription('');
        setIsAddingPlaylist(false);
    };

    return (
        <div className="space-y-6 rounded-lg bg-gray-800 p-3">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 border-b border-gray-400 pb-3">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Your Playlists</h2>
                <button onClick={() => setIsAddingPlaylist(true)} className="bg-purple-600 text-white px-4 py-2 rounded-full text-lg">
                    +
                </button>
            </div>
    
            {isAddingPlaylist && (
                <div className="p-3 mb-4 space-y-2">
                    <input
                        type="text"
                        placeholder="Playlist Name"
                        value={newPlaylistName}
                        onChange={(e) => setNewPlaylistName(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 w-full text-black"
                    />
                    <input
                        type="text"
                        placeholder="Playlist Image URL"
                        value={newPlaylistImageURL}
                        onChange={(e) => setNewPlaylistImageURL(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 w-full text-black"
                    />
                    <input
                        type="text"
                        placeholder="Playlist Description"
                        value={newPlaylistDescription}
                        onChange={(e) => setNewPlaylistDescription(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 w-full text-black"
                    />
                    <div className="flex justify-between">
                        <button onClick={handleCreatePlaylist} className="bg-purple-600 text-white px-3 py-1 rounded">
                            Create
                        </button>
                        <button onClick={() => setIsAddingPlaylist(false)} className="bg-purple-600 text-white px-3 py-1 rounded">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
    
            {playlists.map((playlist, index) => (
                <div
                    key={index}
                    className="flex items-center space-x-2 sm:space-x-4 text-lg p-2 sm:p-3 hover:bg-gray-700 rounded-lg cursor-pointer transition duration-300"
                    onClick={(event) => {
                        onPlaylistClick(event, playlist);
                        navigate('/playlist');
                    }}
                >
                    <img src={playlist.image} alt={playlist.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded" />
                    <span className="text-sm sm:text-lg">{playlist.name}</span>
                </div>
            ))}
        </div>
    );
    
};

export default Sidebar;