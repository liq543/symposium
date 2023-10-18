import React, { useState, useEffect } from 'react';

const PORT = process.env.PORT || 3001;

const formatDuration = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

const PlaylistView = ({ playlist, onSelectSong, currentView, setCurrentView }) => {
    const [songsDetail, setSongsDetail] = useState([]);

    useEffect(() => {
        if (!playlist) {
            return;
        }
        setCurrentView('playlist');

        const fetchSongDetails = async () => {
            try {
                const response = await fetch(`http://localhost:${PORT}/api/playlists/${playlist.id}`);
                const data = await response.json();
                setSongsDetail(data.playlistSongs.map(ps => ps.song)); // Extracting songs from playlistSongs property
            } catch (error) {
                console.error('Error fetching song details:', error);
            }
        };

        fetchSongDetails();
    }, [playlist, setCurrentView]);

    if (!playlist) {
        return null; // or return a loading spinner or some placeholder content
    }
    return (
        <div className="flex flex-col w-full p-2 bg-gray-800 bg-opacity-60 rounded-lg pb-20 overflow-hidden">
            <div className="w-full flex items-start mb-10">
                {/* Force the image to be a fixed size of 250x250 and square */}
                <img
                    src={playlist.image}
                    alt={playlist.name}
                    className="w-56 h-56 mr-8 rounded-lg shadow-lg object-cover"
                />
                <div>
                    <div>
                        <h2 className="font-bold text-4xl text-white mb-1 opacity-80 mt-4">{playlist.name}</h2>
                        <p className="text-lg text-white opacity-60">{playlist.description}</p> {/* Display the description */}
                        </div>
                </div>
            </div>
            <div className="w-full flex flex-col space-y-2 overflow-y-auto max-h-[calc(100vh-500px)] mb-10">
                {songsDetail.map((songDetail, index) => {
                    if (!songDetail) return null;
                    return (
                        <div key={index} className="flex justify-between items-center p-3 bg-white bg-opacity-20 backdrop-blur-sm animate-slidedown rounded-lg hover:bg-opacity-30 transition duration-300 cursor-pointer"
                            onClick={() => {
                                console.log('clicked song at index', index);
                                onSelectSong(songDetail.id, index)
                            }
                            }>
                            <div className="flex items-center">
                                <img src={songDetail.albumImage || './default-image.png'} alt="Album Cover" className="w-12 h-12 mr-3" />
                                <div>
                                    <span className="text-lg block font-semibold text-white opacity-80">{songDetail.title}</span>
                                    <span className="text-sm text-gray-300 opacity-80">{songDetail.artist}</span>
                                </div>
                            </div>
                            <span className="text-sm text-white opacity-60">{formatDuration(songDetail.duration)}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PlaylistView;
