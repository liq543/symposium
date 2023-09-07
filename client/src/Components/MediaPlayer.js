/* global Spotify */
import React, { useState, useEffect } from 'react';

const MediaPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    // Initialize Spotify Player
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = localStorage.getItem('spotify_access_token'); // Ensure this token is available and valid
      const spotifyPlayer = new Spotify.Player({
        name: 'Your Web Player Name',
        getOAuthToken: cb => { cb(token); }
      });

      // Error handling
      spotifyPlayer.addListener('initialization_error', ({ message }) => { console.error(message); });
      spotifyPlayer.addListener('authentication_error', ({ message }) => { console.error(message); });
      spotifyPlayer.addListener('account_error', ({ message }) => { console.error(message); });
      spotifyPlayer.addListener('playback_error', ({ message }) => { console.error(message); });

      // Playback status updates
      spotifyPlayer.addListener('player_state_changed', state => {
        setIsPlaying(!state.paused);
      });

      // Ready
      spotifyPlayer.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      spotifyPlayer.connect();
      
      setPlayer(spotifyPlayer);
    };
  }, []);

  const playPause = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.resume();
    }
  };

  const skipToNext = () => {
    player.nextTrack();
  };

  const skipToPrevious = () => {
    player.previousTrack();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between p-4 space-x-4" style={{ backgroundColor: '#4F518C' }}>
      {/* Album Cover and Song Details */}
      <div className="flex items-center space-x-4">
        <img src="/path_to_album_cover.jpg" alt="Album Cover" className="w-12 h-12 rounded-md" />
        <div>
          <h4 className="text-white font-medium">Song Title</h4>
          <p className="text-gray-400">Artist Name</p>
        </div>
      </div>

      {/* Media Controls */}
      <div className="flex items-center space-x-4 mx-auto">
        <button className="p-2 hover:bg-DABFFF rounded-full" onClick={skipToPrevious}>
          <span className="material-icons text-white">skip_previous</span>
        </button>
        
        <button className="p-4 hover:bg-DABFFF rounded-full" onClick={playPause}>
          <span className="material-icons text-white">{isPlaying ? 'pause' : 'play_arrow'}</span>
        </button>

        <button className="p-2 hover:bg-DABFFF rounded-full" onClick={skipToNext}>
          <span className="material-icons text-white">skip_next</span>
        </button>
      </div>

      {/* Spacer */}
      <div className="w-64"></div>
    </div>
  );
}

export default MediaPlayer;
