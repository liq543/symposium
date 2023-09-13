import React, { useState } from 'react';

const Sidebar = ({ onPlaylistClick }) => {
    const samplePlaylists = [
        {
            name: `Griffin's Cool Jams`,
            image: './images/palm.jpg',
            songs: [
                '3qPZlJAvV95TnC4kFgTvnA',
                '6jEqBrapfygeEbxdVqMlvl',
                '1qPDHJnx0JuDOE7QnpjtAd',
                '2yNiL8SXT6xDcalxNmwJVj',
                '5Ma1xPAUNkOz4q3Hg7THSI',
                '1hRRp3uMap1ZfN7ulNal3T',
                '7bpfZYrS4dQKxiuj6QiRaX',
                '6eJVuYB7vUq1V3NqTzRaKp',
                '7klj1kmMJGNYR1NB2UexK6',
            ],
        },
    ];

    const [isAddingPlaylist, setIsAddingPlaylist] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');

    const handleCreatePlaylist = () => {

        console.log('New Playlist Name:', newPlaylistName);

        setNewPlaylistName('');
        setIsAddingPlaylist(false);
    };

    return (
        <div className="w-1/4 space-y-6 rounded-3xl" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
            <div className="p-3 border-b border-gray-300 mb-4">
                <h2 className="text-2xl font-bold">Your Playlists</h2>
            </div>
            <div className="p-3 mb-4">
                {isAddingPlaylist ? (
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            placeholder="Playlist Name Here!"
                            value={newPlaylistName}
                            onChange={(e) => setNewPlaylistName(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 w-2/3"
                        />
                        <button
                            onClick={handleCreatePlaylist}
                            className=" bg-purple-600 text-white px-3 py-1 rounded "
                        >
                            Create
                        </button>
                        <button
                            onClick={() => setIsAddingPlaylist(false)}
                            className=" bg-purple-600 text-white px-3 py-1 rounded "
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsAddingPlaylist(true)}
                        className=" bg-purple-600 text-white px-3 py-1 rounded "
                    >
                        Create New Playlist
                    </button>
                )}
            </div>
            {samplePlaylists.map((playlist, index) => (
                <div
                    key={index}
                    className="flex items-center space-x-4 text-lg p-3 hover:bg-white hover:bg-opacity-20 backdrop-blur-sm rounded-lg cursor-pointer transition duration-300"
                    onClick={() => onPlaylistClick(playlist)}
                >
                    <img src={playlist.image} alt={playlist.name} className="w-12 h-12 rounded" />
                    <span>{playlist.name}</span>
                </div>
            ))}
        </div>
    );
};

export default Sidebar;






// import React from 'react';

// const Sidebar = ({ onPlaylistClick }) => {
//     const samplePlaylists = [
//         {
//             name: `Griffin's Cool Jams`,
//             image: './images/palm.jpg',
//             songs: ['3qPZlJAvV95TnC4kFgTvnA',
//                     '6jEqBrapfygeEbxdVqMlvl',
//                     '1qPDHJnx0JuDOE7QnpjtAd',
//                     '2yNiL8SXT6xDcalxNmwJVj',
//                     '5Ma1xPAUNkOz4q3Hg7THSI',
//                     '1hRRp3uMap1ZfN7ulNal3T',
//                     '7bpfZYrS4dQKxiuj6QiRaX',
//                     '6eJVuYB7vUq1V3NqTzRaKp',
//                     '7klj1kmMJGNYR1NB2UexK6'
//             ]
//         },
//     ];

//     return (
//         <div className="w-1/4 space-y-6 rounded-3xl" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
//             <div className="p-3 border-b border-gray-300 mb-4">
//                 <h2 className="text-2xl font-bold">Your Playlists</h2>
//             </div>
//             {samplePlaylists.map((playlist, index) => (
//                 <div 
//                     key={index} 
//                     className="flex items-center space-x-4 text-lg p-3 hover:bg-white hover:bg-opacity-20 backdrop-blur-sm rounded-lg cursor-pointer transition duration-300"
//                     onClick={() => onPlaylistClick(playlist)}
//                 >
//                     <img src={playlist.image} alt={playlist.name} className="w-12 h-12 rounded" />
//                     <span>{playlist.name}</span>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Sidebar;
