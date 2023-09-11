import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import MainView from './Components/MainView';
import MediaPlayer from './Components/MediaPlayer';
import AuthCallback from './Components/AuthCallback';
import PlaylistView from './Components/PlaylistView';

const DefaultRedirector = () => {
    const navigate = useNavigate();
    React.useEffect(() => {
        navigate('/player');
    }, [navigate]);

    return null;
}
const token = localStorage.getItem('spotify_access_token');
const App = () => {
    const [selectedSong, setSelectedSong] = useState(null);
    const [currentView, setCurrentView] = useState('main');
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [currentPlaylist, setCurrentPlaylist] = useState(null);

    const [currentSongIndex, setCurrentSongIndex] = useState(null);


    const fetchSongDetails = async (trackId) => {
        const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    
        const data = await response.json();
    
        return data;
    }

    const handleSpecificSongSelect = async (songId, index = null) => {
        console.log("handleSpecificSongSelect called with ID:", songId);
    
        const songData = await fetchSongDetails(songId);
        console.log(songData);
        if (songData) {
        const selectedSong = {
            uri: songData.uri,
            title: songData.name,
            artist: songData.artists[0].name,
            duration: songData.duration_ms,
            albumCover: songData.album.images[0]?.url || './default-image.png'
};
        setSelectedSong(selectedSong);
    
        if (index !== null) {
            setCurrentSongIndex(index);
        } else {
            setCurrentSongIndex(null);
            setCurrentPlaylist(null);
        }
        } else {
        console.log('Failed to retrieve song details for ID:', songId);
        }
    }

    const handleSongSelect = (songDetail, index = null) => {
        console.log("handleSongSelect called with index:", index);
        const songData = {
            uri: songDetail.uri,
            title: songDetail.name,
            artist: songDetail.artists[0].name,
            duration: songDetail.duration_ms,
            albumCover: songDetail.album.images[0]?.url || './default-image.png'
        };
        setSelectedSong(songData);
    
        if (index !== null) {
            setCurrentSongIndex(index);
        } else {
            setCurrentSongIndex(null);
            setCurrentPlaylist(null);
        }
    };
    

    const handlePlaylistClick = (playlist) => {
        setSelectedPlaylist(playlist);
        setCurrentPlaylist(playlist);
        setCurrentView('playlist');
    };

    return (
        <div style={{ backgroundColor: '#2C2A4A' }} className="h-screen text-white overflow-hidden">
            <Router>
                <Routes>
                    <Route path="/callback" element={<AuthCallback />} />
                    <Route path="*" element={<DefaultRedirector />} />
                </Routes>
            </Router>
            <Header />
            <div className="flex mt-10 px-8 overflow-hidden">
                <Sidebar onSongSelect={handleSongSelect} onPlaylistClick={handlePlaylistClick} />
                {currentView === 'main' && <MainView />}
                {currentView === 'playlist' && <PlaylistView playlist={selectedPlaylist} onSelectSong={handleSongSelect} />}
            </div>
            <MediaPlayer 
                selectedSong={selectedSong} 
                currentSongIndex={currentSongIndex}
                currentPlaylist={currentPlaylist}
                onSongChange={handleSongSelect}
                handleSpecificSongSelect={handleSpecificSongSelect} 
            />
        </div>
    );
}

export default App;
