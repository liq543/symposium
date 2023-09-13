import React from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar({ onPlaylistClick, playlist }) {
    const navigate = useNavigate();

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
                '6eJVuYB7vUq1V3NqTzRaKp',
                '7klj1kmMJGNYR1NB2UexK6'
            ]
        },
    ];

    return (
        <div className="w-1/4 space-y-6 rounded-3xl" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
            <div className="p-3 border-b border-gray-300 mb-4">
                <h2 className="text-2xl font-bold">Your Playlists</h2>
            </div>
            {samplePlaylists.map((playlist, index) => (
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
            ))}
        </div>
    );
};

export default Sidebar;