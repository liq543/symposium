import React from 'react';

const MainView = () => (
    <div className="w-3/4 space-y-10 pl-6">
        <div>
            <h2 className="text-2xl font-bold mb-4">Featured Playlists</h2>
            <div className="flex space-x-6 overflow-x-auto">
                {/* Sample Playlist Card */}
                <div className="w-64 p-5 rounded-lg text-slate-900" style={{ backgroundColor: '#DABFFF' }}>
                    <img src="/path_to_cover.jpg" alt="Cover" className="w-full rounded-lg mb-3" />
                    <h3 className="text-xl">Chill Vibes</h3>
                </div>
                {/* Add more cards similarly */}
            </div>
        </div>
        <div>
            <h2 className="text-2xl font-bold mb-4">Recent Releases</h2>
            <div className="flex space-x-6 overflow-x-auto">
                {/* Sample Release Card */}
                <div className="w-64 p-5 rounded-lg text-slate-900" style={{ backgroundColor: '#DABFFF' }}>
                    <img src="/path_to_album_cover.jpg" alt="Album Cover" className="w-full rounded-lg mb-3" />
                    <h3 className="text-xl">New Beats</h3>
                </div>
                {/* Add more cards similarly */}
            </div>
        </div>
    </div>
);

export default MainView;
