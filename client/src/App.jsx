import React, { useState, createContext, useContext, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import AuthCallback from './Components/AuthCallback';
import PlaylistView from './Components/PlaylistView';
import SearchComponent from './Components/SearchComponent';
import Login from './Components/LoginModal';
import Signup from './Components/SignupModal';
import NewMediaPlayer from './Components/NewMediaPlayer';

const token = localStorage.getItem('spotify_access_token');
export const AuthContext = createContext();

function DefaultRedirector() {
    const navigate = useNavigate();

    React.useEffect(() => {
        navigate('/playlist');
    }, [navigate]);
    return null;
};
function App() {

    const [selectedSong, setSelectedSong] = useState(null);
    const [currentView, setCurrentView] = useState('main');
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [currentPlaylist, setCurrentPlaylist] = useState(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('spotify_access_token'));
    const [navigateTo, setNavigateTo] = useState(null);
    const [playlist, setPlaylist] = useState([]);

    const handleSongSelect = (songId) => {
        fetch(`http://localhost:3001/api/songs/${songId}`)
          .then(response => response.json())
          .then(data => {
            setSelectedSong(data);
            setCurrentSongIndex(playlist.findIndex(item => item.id === data.id)); // Update index when a song is selected.
          })
          .catch(error => {
            console.error("Error fetching song data:", error);
          });
      };

      const handleNextSong = () => {
        if (currentSongIndex !== null && playlist && playlist.length > 0) {
            const nextIndex = (currentSongIndex + 1) % playlist.length;
            setCurrentSongIndex(nextIndex);
            handleSongSelect(playlist[nextIndex].id);
        }
    };
    
    
    const handlePrevSong = () => {
        if (currentSongIndex !== null && playlist && playlist.length > 0) {
            const prevIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
            setCurrentSongIndex(prevIndex);
            handleSongSelect(playlist[prevIndex].id); // Fetch the previous song from your backend.
        }
    };

    const handlePlaylistClick = (event, playlist) => {
        event.preventDefault();

        console.log('Playlist Clicked:', playlist);
        setSelectedPlaylist(playlist);
        setCurrentPlaylist(playlist);
        setCurrentView('playlist');
        setPlaylist(playlist.songs);
    };


    return (
        <Router>
            <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
                <div style={{ backgroundColor: '#2C2A4A' }} className="h-screen text-white overflow-hidden">
                    <Header isLoggedIn={isLoggedIn} />
                    <div className="flex mt-10 px-8 overflow-hidden space-x-8">
                        <div className="w-1/4 mt-2">
                            <SearchComponent onSongSelect={handleSongSelect} />
                            <Sidebar onSongSelect={handleSongSelect} onPlaylistClick={handlePlaylistClick} />
                        </div>
                        <div className="w-3/4">
                            <Routes>
                                <Route path="/callback" element={<AuthCallback />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/playlist" element={<PlaylistView playlist={selectedPlaylist} onSelectSong={handleSongSelect} currentView={currentView} setCurrentView={setCurrentView} />} />
                                <Route path="*" element={<DefaultRedirector />} />
                            </Routes>
                        </div>
                    </div>

                    {/* <div className="flex mt-2 px-8 overflow-hidden space-x-8">
                        <div className="flex flex-col space-y-4 w-1/4">
                            <SearchComponent onSongSelect={handleSongSelect} />
                            <Sidebar onSongSelect={handleSongSelect} onPlaylistClick={handlePlaylistClick} />
                        </div>
                    </div> */}
<NewMediaPlayer
    currentSong={selectedSong} // Add this
    currentSongIndex={currentSongIndex}
    playlist={currentPlaylist}
    onNextSong={handleNextSong}
    onPrevSong={handlePrevSong}
    handleSongSelect={handleSongSelect}
/>
                </div>
            </AuthContext.Provider>
        </Router >
    )
};

export default App;
