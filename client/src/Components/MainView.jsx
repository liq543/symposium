import React from 'react';

import SongCard from './SongCard';
import { genres } from '../assests/constants';


const MainView = () => {
    const genreTitle = 'Pop'

    return (
        <div className="flex flex-col">
            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className="font-bold text-3xl text-white text-left">Discover {genreTitle}</h2>

                <select
                    onChange={() => { }}
                    value=""
                    className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
                >
                    {genres.map((genre) => <option key={genre.value} value={genre.value}>{genre.title}</option>)}
                </select>
            </div>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((song, i) => (
                    <SongCard
                        key={song.key}
                        song={song}
                        i={i}
                    />
                ))}
            </div>
        </div>
    );
};
//     <div className="w-3/4 space-y-10 pl-6">
//         <div>
//             <h2 className="text-2xl font-bold mb-4">Featured Playlists</h2>
//             <div className="flex space-x-6 overflow-x-auto">
//                 {/* Sample Playlist Card */}
//                 <div className="w-64 p-5 rounded-lg text-slate-900" style={{ backgroundColor: '#DABFFF' }}>
//                     <img src="/path_to_cover.jpg" alt="Cover" className="w-full rounded-lg mb-3" />
//                     <h3 className="text-xl">Chill Vibes</h3>
//                 </div>
//                 {/* Add more cards similarly */}
//             </div>
//         </div>
//         <div>
//             <h2 className="text-2xl font-bold mb-4">Recent Releases</h2>
//             <div className="flex space-x-6 overflow-x-auto">
//                 {/* Sample Release Card */}
//                 <div className="w-64 p-5 rounded-lg text-slate-900" style={{ backgroundColor: '#DABFFF' }}>
//                     <img src="/path_to_album_cover.jpg" alt="Album Cover" className="w-full rounded-lg mb-3" />
//                     <h3 className="text-xl">New Beats</h3>
//                 </div>
//                 {/* Add more cards similarly */}
//             </div>
//         </div>
//     </div>
// );

export default MainView;
