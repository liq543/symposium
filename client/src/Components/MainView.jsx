import axios from 'axios';
import { useState, useEffect } from 'react';
import SongCard from './SongCard';

const MainView = () => {
    const [songs, setSongs] = useState([]);

    const fetchSongs = async () => {
        const token = localStorage.getItem('spotify_access_token');
        try {
            const response = await axios.get(`https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response);
            setSongs(response.data.tracks.items);
        } catch (error) {
            console.error('Error fetching songs from Spotify:', error);
        }
    };

    useEffect(() => {
        fetchSongs();
    }, []);

    return (
        <div className="flex flex-col">
            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className="font-bold text-3xl text-white text-left">Discover</h2>
            </div>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {songs.map((song, i) => (
                    <SongCard
                        key={song.track.id}
                        song={song.track}
                        i={i}
                    />
                ))}
            </div>
        </div>
    );
};

export default MainView;

