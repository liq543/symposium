/* global Spotify */
import React, { useState, useEffect } from 'react';

const MediaPlayer = ({ selectedSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(null);
  const [deviceID, setDeviceID] = useState(null); // This will be set to the device ID of the Spotify Web Player
  const [volume, setVolume] = useState(50); // Initialize volume 
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);

  useEffect(() => {
    // Initialize Spotify Player
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = localStorage.getItem('spotify_access_token'); // Ensure this token is available and valid
      const spotifyPlayer = new Spotify.Player({
        name: 'Symposium Web Player',
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
        setDeviceID(device_id); // set the device ID
      });

      spotifyPlayer.connect();

      setPlayer(spotifyPlayer);
    };
  }, []);

  useEffect(() => {
    if (player && selectedSong) {
        const songUri = selectedSong.uri;
        console.log(selectedSong.uri);
        const token = localStorage.getItem('spotify_access_token'); // Retrieve the stored token

        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [songUri] }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    console.error('Spotify API Response:', err);
                    throw err;
                });
            }
            console.log('Playing:', selectedSong.title);
        })
        .catch(error => {
            console.error("Error playing song:", error);
        });
    }
}, [player, selectedSong, deviceID]);

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

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between p-4 space-x-4" style={{ backgroundColor: '#4F518C' }}>
        {/* Album Cover and Song Details */}
        <div className="flex items-center space-x-4">
            <img src={selectedSong ? selectedSong.albumCover : "/default_cover.jpg"} alt="Album Cover" className="w-12 h-12 rounded-md" />
            <div>
                <h4 className="text-white font-medium">{selectedSong ? selectedSong.title : "No Song Selected"}</h4>
                <p className="text-gray-400">{selectedSong ? selectedSong.artist : "Select a song"}</p>
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

       {/* Volume Slider */}
       <div className="flex items-center space-x-2">
        <span className="material-icons text-gray-400">volume_down</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="w-16 h-4 rounded-full bg-gray-300 appearance-none"
        />
        <span className="material-icons text-gray-400">volume_up</span>
      </div>

      {/* Spacer */}
      <div className="w-64"></div>
    </div>
  );
}

export default MediaPlayer;
