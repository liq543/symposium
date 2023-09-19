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
        <div className="space-y-6 rounded-lg" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
            <div className="p-3 border-b border-gray-300 mb-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Your Playlists</h2>
                <button onClick={() => setIsAddingPlaylist(true)} className="bg-purple-600 text-white px-3 py-1 rounded-full">
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
                    className="flex items-center space-x-4 text-lg p-3 hover:bg-white hover:bg-opacity-20 backdrop-blur-sm rounded-lg cursor-pointer transition duration-300"
                    onClick={(event) => {
                        onPlaylistClick(event, playlist)
                        navigate('/playlist');
                    }
                    }
                >
                    <img src={playlist.image} alt={playlist.name} className="w-12 h-12 rounded" />
                    <span>{playlist.name}</span>
                </div>
            ))
            }
        </div >
    );
};

export default Sidebar;