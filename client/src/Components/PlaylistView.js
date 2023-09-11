import React from 'react';

const PlaylistView = ({ playlist }) => {
    return (
        <div className="flex flex-col w-full p-8 bg-gray-800 bg-opacity-60 rounded-lg pb-20 overflow-hidden">
            <div className="w-full flex items-start mb-10">
                {/* Force the image to be a fixed size of 250x250 and square */}
                <img 
                    src={playlist.image} 
                    alt={playlist.name} 
                    className="w-56 h-56 mr-8 rounded-lg shadow-lg object-cover"
                />
                <div>
                    <h2 className="font-bold text-4xl text-white mb-4 opacity-80">{playlist.name}</h2>
                    {/* we can add a playlist description or somfin here */}
                </div>
            </div>
            <div className="w-full flex flex-col space-y-2 overflow-y-auto max-h-[calc(100vh-520px)] mb-10">
                {playlist.songs.map((song, index) => (
                    <div 
                        key={index} 
                        className="flex flex-col p-3 bg-white bg-opacity-20 backdrop-blur-sm animate-slideup rounded-lg hover:bg-opacity-30 transition duration-300 cursor-pointer"
                    >
                        <span className="text-lg block font-semibold text-white opacity-80">{song.name}</span>
                        <span className="text-sm text-gray-300 mt-1 opacity-80">{song.artist}</span>
                        <span className="text-sm mt-1 text-white opacity-60">{Math.floor(song.duration / 60000)}:{String((song.duration % 60000) / 1000).padStart(2, '0')}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlaylistView;



// PROP OBJECT FORMAT
// {
//     name: 'Playlist Name',
//     image: 'path2image',
//     songs: [
//       {
//         name: 'Song Name',
//         artist: 'Artist Name',
//         duration: 200000 // duration in milliseconds
//       },
