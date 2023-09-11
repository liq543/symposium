import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import MainView from './Components/MainView';
import MediaPlayer from './Components/MediaPlayer';
import AuthCallback from './Components/AuthCallback';
import PlaylistView from './Components/PlaylistView'; // Make sure to put it in the right path

const DefaultRedirector = () => {
    const navigate = useNavigate();
    React.useEffect(() => {
        navigate('/player');
    }, [navigate]);

    return null;
}

const App = () => {
    const [selectedSong, setSelectedSong] = useState(null);
    const [currentView, setCurrentView] = useState('main');
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);

    const handleSongSelect = (song) => {
        console.log('Received song in App.js:', song);
        setSelectedSong(song);
    };

    const handlePlaylistClick = (playlist) => {
        setSelectedPlaylist(playlist);
        setCurrentView('playlist');
    };

    return (
        <div style={{ backgroundColor: '#2C2A4A' }} className="h-screen text-white overflow-hidden">
            <Router>
                <Routes>
                    <Route path="/callback" element={<AuthCallback />} />
                    <Route path="/player" element={<MediaPlayer selectedSong={selectedSong} />} />
                    <Route path="/playlist" element={<PlaylistView playlist={selectedPlaylist} />} />
                    <Route path="*" element={<DefaultRedirector />} />
                </Routes>
            </Router>
            <Header />

            <div className="flex mt-10 px-8 overflow-hidden">
                <Sidebar onSongSelect={handleSongSelect} onPlaylistClick={handlePlaylistClick} />
                {currentView === 'main' && <MainView />}
                {currentView === 'playlist' && <PlaylistView playlist={selectedPlaylist} />}
            </div>
            <MediaPlayer selectedSong={selectedSong} />
        </div>
    );
}

export default App;
