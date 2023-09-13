/* global Spotify */
import React, { useState, useEffect, useRef } from 'react';

const MediaPlayer = ({ selectedSong, currentSongIndex, currentPlaylist, onSongChange, handleSpecificSongSelect }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(null);
  const [deviceID, setDeviceID] = useState(null); // This will be set to the device ID of the Spotify Web Player
  const [volume, setVolume] = useState(100); // Initialize volume
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const playbackTimeRef = useRef(0);
  const [shuffledSongs, setShuffledSongs] = useState([]); // Shuffled list of songs

  useEffect(() => {
    // Initialize Spotify Player
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = localStorage.getItem('spotify_access_token'); // Ensure this token is available and valid
      const spotifyPlayer = new Spotify.Player({
        name: 'Symposium Web Player',
        getOAuthToken: cb => {
          cb(token);
        },
      });

      
 const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const shuffleSongs = () => {
  const shuffled = shuffleArray(songs);
  setShuffledSongs(shuffled);
};

useEffect(() => {
  shuffleSongs();
}, [songs]);

      // Error handling
      spotifyPlayer.addListener('initialization_error', ({ message }) => {
        console.error(message);
      });
      spotifyPlayer.addListener('authentication_error', ({ message }) => {
        console.error(message);
      });
      spotifyPlayer.addListener('account_error', ({ message }) => {
        console.error(message);
      });
      spotifyPlayer.addListener('playback_error', ({ message }) => {
        console.error(message);
      });
      spotifyPlayer.addListener('player_state_changed', state => {
        setIsPlaying(!state.paused);
        playbackTimeRef.current = state.position;
        setCurrentPlaybackTime(state.position);
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
    if (player) {
      player.setVolume(volume / 100); // Set the volume
    }
  }, [player, volume]);
  
  useEffect(() => {
    // If a song is playing, set up an interval to update every second.
    const interval = isPlaying ? setInterval(() => {
        playbackTimeRef.current += 1000;
        setCurrentPlaybackTime(playbackTimeRef.current);
    }, 1000) : null;

    // Clear the interval when the song is paused or the component is unmounted.
    return () => {
        if (interval) clearInterval(interval);
    };
}, [isPlaying]);

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
          Authorization: `Bearer ${token}`,
        },
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
          console.error('Error playing song:', error);
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

  const changeSong = (indexChange) => {
    if (currentPlaylist && currentSongIndex !== null) {
      const newIndex = currentSongIndex + indexChange;
      if (newIndex >= 0 && newIndex < currentPlaylist.songs.length) {
        const newSongId = currentPlaylist.songs[newIndex];
        handleSpecificSongSelect(newSongId, newIndex);
      }
    }
  };

const skipToNext = () => {
  changeSong(1);
};

const skipToPrevious = () => {
  changeSong(-1);
};

  function formatTime(milliseconds) {
    let totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

const handleProgressBarClick = (e) => {
  const progressBarWidth = e.currentTarget.offsetWidth;
  const clickPositionInPixels = e.nativeEvent.offsetX;
  const clickPostionInMs = (clickPositionInPixels / progressBarWidth) * selectedSong.duration;

  // use sdkj to seek to clickPostionInMs
  if (player) {
    player.seek(clickPostionInMs).catch(error => {
      console.error('Error seeking:', error);
    });
  }
};

const songProgressPercentage = selectedSong ? (currentPlaybackTime / selectedSong.duration) * 100 : 0;

return (
  <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between p-4 space-x-4 z-10" style={{ backgroundColor: '#4F518C' }}>
      {/* Album Cover and Song Details */}
      <div className="flex items-center space-x-4">
          <img src={selectedSong ? selectedSong.albumCover : './sc.png'} alt="Album Cover" className="w-12 h-12 rounded-md" />
          <div>
              <h4 className="text-white font-medium">{selectedSong ? selectedSong.title : 'No Song Selected'}</h4>
              <p className="text-gray-400">{selectedSong ? selectedSong.artist : 'Select a song'}</p>
          </div>
      </div>

      {/* Media Controls */}
      <div className="flex items-center space-x-4">
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

      {/* Progress Bar */}
      <div className="flex items-center w-3/4 mt-2 mb-4">
    <div className="relative w-full h-2 bg-gray-600 rounded" onClick={handleProgressBarClick}>
        <div className="absolute top-0 left-0 h-2 bg-white rounded" style={{ width: `${songProgressPercentage}%` }}></div>
    </div>
    <div className="ml-2 text-gray-400" style={{ fontSize: '0.7rem' }}>
        {formatTime(currentPlaybackTime)}/{selectedSong ? formatTime(selectedSong.duration) : '0:00'}
    </div>
</div>

      {/* Volume Slider */}
      <div className="flex items-center space-x-4">
          <span className="material-icons text-gray-400">volume_down</span>
          <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={e => setVolume(e.target.value)}
              className="w-16 h-4 rounded-full bg-gray-300 appearance-none"
          />
          <span className="material-icons text-gray-400">volume_up</span>
      </div>
  </div>
);
};

export default MediaPlayer;
