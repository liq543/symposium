import React, { useState } from 'react';

const MediaPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

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
        {/* Previous Button */}
        <button className="p-2 hover:bg-DABFFF rounded-full">
          <span className="material-icons text-white">skip_previous</span>
        </button>

        {/* Play/Pause Button */}
        <button
          className="p-4 hover:bg-DABFFF rounded-full"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          <span className="material-icons text-white">
            {isPlaying ? 'pause' : 'play_arrow'}
          </span>
        </button>

        {/* Next Button */}
        <button className="p-2 hover:bg-DABFFF rounded-full">
          <span className="material-icons text-white">skip_next</span>
        </button>
      </div>

      {/* Spacer to push the controls to the center */}
      <div className="w-64"></div>
    </div>
  );
}

export default MediaPlayer;
