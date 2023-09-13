import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
console.log(process.env.REACT_APP_SPOTIFY_CLIENT_ID);
const REDIRECT_URI = 'http://localhost:3000/callback';
const loginURL = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private&response_type=token&state=123`;

const Header = ({ logout, isLoggedIn }) => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setSignupModalOpen] = useState(false);
    const [isSpotifyConnected, setSpotifyConnected] = useState(JSON.parse(localStorage.getItem('spotifyConnected')) || false);
    const [isUserLoggedIn, setUserLoggedIn] = useState(JSON.parse(localStorage.getItem('userLoggedIn')) || false);

    useEffect(() => {
        localStorage.setItem('spotifyConnected', JSON.stringify(isSpotifyConnected));
    }, [isSpotifyConnected]);

    useEffect(() => {
        localStorage.setItem('userLoggedIn', JSON.stringify(isUserLoggedIn));
    }, [isUserLoggedIn]);

    return (
        <div className="py-5 px-8 flex justify-between items-center border-b" style={{ borderColor: '#4F518C' }}>
            <div className="flex items-center">
                <img src="/images/largesymp.png" alt="Logo" className="w-10 h-10" />
                <h1 className="text-3xl font-bold -ml-2" style={{ color: '#DABFFF' }}>ymposium</h1>
            </div>
            <div className="space-x-4">
                {!isSpotifyConnected && <a href={loginURL} onClick={() => setSpotifyConnected(true)} className="px-5 py-2 rounded-full hover:bg-DABFFF" style={{ backgroundColor: '#907AD6' }}>Connect Spotify</a>}
                {isSpotifyConnected && !isUserLoggedIn && <button onClick={() => setLoginModalOpen(true)} className="px-5 py-2 rounded-full hover:bg-DABFFF" style={{ backgroundColor: '#907AD6' }}>Log In</button>}
                {isSpotifyConnected && !isUserLoggedIn && <button onClick={() => setSignupModalOpen(true)} className="px-5 py-2 rounded-full hover:bg-DABFFF" style={{ backgroundColor: '#907AD6' }}>Sign Up</button>}
                {isUserLoggedIn && <Link to="/logout" onClick={() => { setSpotifyConnected(false); setUserLoggedIn(false); }} className="px-5 py-2 rounded-full hover:bg-DABFFF" style={{ backgroundColor: '#907AD6', textDecoration: 'none', display: 'block' }}>Logout</Link>}
            </div>

            {isLoginModalOpen && <LoginModal onClose={() => { setLoginModalOpen(false); setUserLoggedIn(true); }} />} {/* Once the modal is closed, assume user has logged in */}
            {isSignupModalOpen && <SignupModal onClose={() => setSignupModalOpen(false)} />}
        </div>
    );
};

export default Header;