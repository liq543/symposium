import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import MainView from './Components/MainView';
import MediaPlayer from './Components/MediaPlayer';
import AuthCallback from './Components/AuthCallback';

const DefaultRedirector = () => {
    const navigate = useNavigate();
    React.useEffect(() => {
        navigate('/player');
    }, [navigate]);

    return null; // this component doesn't render anything visibly
}

const App = () => {
    const [selectedSong, setSelectedSong] = useState(null); // Song structure can be { title, artist, albumCover }

    const handleSongSelect = (song) => {
      console.log('Received song in App.js:', song);
      setSelectedSong(song);
  };

    return (
        <div style={{ backgroundColor: '#2C2A4A' }} className="min-h-screen text-white">
            <Router>
                <Routes>
                    <Route path="/callback" element={<AuthCallback />} />
                    <Route path="/player" element={<MediaPlayer selectedSong={selectedSong} />} />
                    <Route path="*" element={<DefaultRedirector />} />
                </Routes>
            </Router>
            <Header />
            <div className="flex mt-10 px-8">
                <Sidebar onSongSelect={handleSongSelect} />
                <MainView />
            </div>
            {/* Media Player */}
            <MediaPlayer selectedSong={selectedSong} />
        </div>
    );
}

export default App;
