import React from 'react';

const Sidebar = () => (
    <div className="w-1/4 space-y-6 pr-6">
        <input type="text" placeholder="Search for music..." className="w-full p-4 rounded-full outline-none" style={{ backgroundColor: '#4F518C' }} />
        <h2 className="text-2xl font-bold mb-4">Your Playlists</h2>
        <div className="text-lg p-3 hover:bg-DABFFF rounded-lg cursor-pointer">Chill Vibes</div>
        {/* Add more playlists similarly */}
    </div>
);

export default Sidebar;
