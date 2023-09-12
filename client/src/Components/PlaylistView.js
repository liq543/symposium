import React, { useState, useEffect } from 'react';

const formatDuration = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

const PlaylistView = ({ playlist, onSelectSong }) => {
const [songsDetail, setSongsDetail] = useState([]);

useEffect(() => {
    const fetchSongDetails = async () => {
    const token = localStorage.getItem('spotify_access_token');
    const songURIs = playlist.songs.join(',');
    try {
        const response = await fetch(`https://api.spotify.com/v1/tracks?ids=${songURIs}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        const data = await response.json();
        console.log("Spotify API Response:", data);
        setSongsDetail(data.tracks.filter(Boolean));
    } catch (error) {
        console.error("Error fetching song details", error);
    }
    };

    fetchSongDetails();
}, [playlist]);
    return (
        <div className="flex flex-col w-full p-8 bg-gray-800 bg-opacity-60 rounded-lg pb-20 overflow-hidden">
            <div className="w-full flex items-start mb-10">
                {/* Force the image to be a fixed size of 250x250 and square */}
                <img 
                    src={playlist.image} 
                    alt={playlist.name} 
                    className="w-56 h-56 mr-8 rounded-lg shadow-lg object-cover"
                />
                <div>
                    <h2 className="font-bold text-4xl text-white mb-4 opacity-80">{playlist.name}</h2>
                    {/* we can add a playlist description or somfin here */}
                </div>
            </div>
            <div className="w-full flex flex-col space-y-2 overflow-y-auto max-h-[calc(100vh-550px)] mb-10">
                {songsDetail.map((songDetail, index) => {
                    if (!songDetail) return null;
                    return (
                        <div key={index} className="flex justify-between items-center p-3 bg-white bg-opacity-20 backdrop-blur-sm animate-slidedown rounded-lg hover:bg-opacity-30 transition duration-300 cursor-pointer"
                            onClick={() => {
                            console.log('clicked song at index', index);
                            onSelectSong(songDetail, index)}
                            }>
                            <div className="flex items-center">
                                <img src={songDetail.album.images[0]?.url || './default-image.png'} alt="Album Cover" className="w-12 h-12 mr-3" />
                                <div>
                                    <span className="text-lg block font-semibold text-white opacity-80">{songDetail.name}</span>
                                    <span className="text-sm text-gray-300 opacity-80">{songDetail.artists[0].name}</span>
                                </div>
                            </div>
                            <span className="text-sm text-white opacity-60">{formatDuration(songDetail.duration_ms)}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PlaylistView;
