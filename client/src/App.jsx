import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import MainView from './Components/MainView';
import MediaPlayer from './Components/MediaPlayer';
import AuthCallback from './Components/AuthCallback';
import PlaylistView from './Components/PlaylistView';
import SearchComponent from './Components/SearchComponent';
import Login from './Components/LoginModal';
import Signup from './Components/SignupModal';

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
        const newSongId = songId.split(':').pop();
        console.log("handleSpecificSongSelect called with ID:", newSongId);

        const songData = await fetchSongDetails(newSongId);
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
        console.log("handleSongSelect called with songDetail: ", songDetail);
        const songData = {
            uri: songDetail.uri,
            title: songDetail.title,
            artist: songDetail.artist,
            duration: songDetail.duration,
            albumCover: songDetail.albumCover || './default-image.png'
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
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </Router>
            <Header />

            <SearchComponent onSongSelect={handleSongSelect} />

            <div className="flex mt-10 px-8 overflow-hidden space-x-8">
                <Sidebar onSongSelect={handleSongSelect} onPlaylistClick={handlePlaylistClick} />
                {currentView === 'main' && <MainView />}
                {currentView === 'playlist' && <PlaylistView playlist={selectedPlaylist} onSelectSong={handleSpecificSongSelect} />}
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
