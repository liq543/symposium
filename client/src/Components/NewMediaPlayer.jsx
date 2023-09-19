import React, { useState, useEffect, useRef } from 'react';

const MediaPlayer = ({ currentSongIndex, playlist, onNextSong, onPrevSong }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
    const [song, setSong] = useState(null);
    const audioRef = useRef(null);

    useEffect(() => {
        // Fetch song data from the server
        fetch("http://localhost:3001/api/songs/65095e5aca85f004b65442bf")
            .then(response => response.json())
            .then(data => {
                setSong(data);
            })
            .catch(error => {
                console.error("Error fetching song data:", error);
            });
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            // Define the event listeners
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
    }, [song]);  // add song as dependency so it re-runs the effect when song changes

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
        <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between p-4 space-x-4 z-10" style={{ backgroundColor: '#4F518C' }}>
            <div className="flex items-center space-x-4">
                <img src={song.albumImage} alt="Album Cover" className="w-12 h-12 rounded-md" />
                <div>
                    <h4 className="text-white font-medium">{song.title}</h4>
                    <p className="text-gray-400">{song.artist}</p>
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

            <div className="flex items-center w-3/4 mt-2 mb-4">
                <div className="relative w-full h-2 bg-gray-600 rounded" onClick={handleProgressBarClick}>
                    <div className="absolute top-0 left-0 h-2 bg-white rounded" style={{ width: `${songProgressPercentage}%` }}></div>
                </div>
                <div className="ml-2 text-gray-400" style={{ fontSize: '0.7rem' }}>
                    {formatTime(currentPlaybackTime)}/{formatTime(song.duration)}
                </div>
            </div>
            <audio ref={audioRef} src={song.file} preload="metadata"></audio>
        </div>
    );
};

export default MediaPlayer;
