import React, { useState, useEffect, useRef } from 'react';

const MediaPlayer = ({ currentSongIndex, playlist, onNextSong, onPrevSong, handleSongSelect, currentSong }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
    const defaultSong = {
        title: 'No Song Selected',
        artist: 'No Song Selected',
        albumImage: '/images/sc.png',
        duration: 0,
        file: ''
    };
    const [song, setSong] = useState(defaultSong);
    const audioRef = useRef(null);
    const [volume, setVolume] = useState(1);

    useEffect(() => {
        if (currentSongIndex !== null && playlist && currentSongIndex < playlist.length) {
            handleSongSelect(playlist[currentSongIndex].id);
        }
    }, [currentSongIndex, playlist]);

    useEffect(() => {
        if (currentSong) {
            setSong(currentSong);
    
            // Wait for the audio file to be loaded before starting playback
            const audioElement = audioRef.current;
            const handleCanPlay = () => {
                audioElement.play();
                setIsPlaying(true);
            };
    
            audioElement.addEventListener('canplay', handleCanPlay);
            
            // Start playing if audio is already ready
            if (audioElement.readyState >= 2) {
                audioElement.play();
                setIsPlaying(true);
            }
    
            return () => {
                audioElement.removeEventListener('canplay', handleCanPlay);
            };
        }
    }, [currentSong]);    

    useEffect(() => {
        if (audioRef.current) {
            const updateTime = () => {
                setCurrentPlaybackTime(audioRef.current.currentTime * 1000);
            };

            const loadMetadata = () => {
                setSong(prevSong => ({
                    ...prevSong,
                    duration: audioRef.current.duration * 1000
                }));
            };

            audioRef.current.addEventListener('timeupdate', updateTime);
            audioRef.current.addEventListener('loadedmetadata', loadMetadata);

            return () => {
                audioRef.current.removeEventListener('timeupdate', updateTime);
                audioRef.current.removeEventListener('loadedmetadata', loadMetadata);
            };
        }
    }, [song]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const playPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleNextSong = () => {
        if (onNextSong) {
            onNextSong();
        }
    };

    const handlePrevSong = () => {
        if (onPrevSong) {
            onPrevSong();
        }
    };

    const handleProgressBarClick = (e) => {
        const progressBarWidth = e.currentTarget.offsetWidth;
        const clickPositionInPixels = e.nativeEvent.offsetX;
        const clickPostionInSeconds = (clickPositionInPixels / progressBarWidth) * audioRef.current.duration;
        audioRef.current.currentTime = clickPostionInSeconds;
    };

    const songProgressPercentage = song?.duration ? (currentPlaybackTime / song.duration) * 100 : 0;

    function formatTime(milliseconds) {
        let totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    if (!song) {
        return <div>Loading...</div>;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between p-2 space-x-4 z-10" style={{ backgroundColor: '#4F518C' }}>
            <div className="flex items-center space-x-4">
                <img src={song.albumImage} alt="Album Cover" className="w-10 h-10 rounded-md" />
                <div>
                    <h4 className="text-white font-medium text-sm">{song.title}</h4>
                    <p className="text-gray-400 text-xs">{song.artist}</p>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <button className="p-4 hover:bg-DABFFF rounded-full" onClick={handlePrevSong}>
                    <span className="material-icons text-white">skip_previous</span>
                </button>

                <button className="p-4 hover:bg-DABFFF rounded-full" onClick={playPause}>
                    <span className="material-icons text-white">{isPlaying ? 'pause' : 'play_arrow'}</span>
                </button>

                <button className="p-4 hover:bg-DABFFF rounded-full" onClick={handleNextSong}>
                    <span className="material-icons text-white">skip_next</span>
                </button>
            </div>

            <div className="flex items-center w-3/4 mt-2 mb-4 space-x-4">
                <div className="relative w-full h-2 bg-gray-600 rounded" onClick={handleProgressBarClick}>
                    <div className="absolute top-0 left-0 h-2 bg-white rounded" style={{ width: `${songProgressPercentage}%` }}></div>
                </div>
                <div className="ml-2 text-gray-400" style={{ fontSize: '0.7rem' }}>
                    {formatTime(currentPlaybackTime)}/{formatTime(song.duration)}
                </div>
                
                <div className="flex items-center space-x-2">
                    <span className="material-icons text-white">volume_down</span>
                    <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.01"
                        value={volume} 
                        onChange={e => setVolume(parseFloat(e.target.value))}
                        className="w-20" />
                    <span className="material-icons text-white">volume_up</span>
                </div>
            </div>
            <audio ref={audioRef} src={song.file} preload="metadata"></audio>
        </div>
    );
};

export default MediaPlayer;
