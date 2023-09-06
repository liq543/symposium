import React from 'react';

const App = () => {
  return (
    <div style={{ backgroundColor: '#2C2A4A' }} className="min-h-screen text-white">
      {/* Header */}
      <div className="py-5 px-8 flex justify-between items-center border-b" style={{ borderColor: '#4F518C' }}>
        <div className="flex items-center">
          <img src="/path_to_monkey_logo.png" alt="Logo" className="w-10 h-10 mr-3" />
          <h1 className="text-3xl font-bold">MonkeyTunes</h1>
        </div>
        <div className="space-x-4">
          <button className="px-5 py-2 rounded-full hover:bg-DABFFF" style={{ backgroundColor: '#907AD6' }}>Login</button>
          <button className="px-5 py-2 rounded-full hover:bg-DABFFF" style={{ backgroundColor: '#907AD6' }}>Sign Up</button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mt-10 px-8">
        <input type="text" placeholder="Search for music..." className="w-full p-4 rounded-full outline-none" style={{ backgroundColor: '#4F518C' }} />
      </div>

      {/* Featured Playlists */}
      <div className="mt-10 px-8">
        <h2 className="text-2xl font-bold mb-4">Featured Playlists</h2>
        <div className="flex space-x-6 overflow-x-scroll">
          {/* Sample Playlist Card */}
          <div className="w-64 p-5 rounded-lg" style={{ backgroundColor: '#DABFFF' }}>
            <img src="/path_to_cover.jpg" alt="Cover" className="w-full rounded-lg mb-3" />
            <h3 className="text-xl">Chill Vibes</h3>
          </div>
          {/* Add more cards similarly */}
        </div>
      </div>

      {/* Recent Releases */}
      <div className="mt-10 px-8">
        <h2 className="text-2xl font-bold mb-4">Recent Releases</h2>
        <div className="flex space-x-6 overflow-x-scroll">
          {/* Sample Release Card */}
          <div className="w-64 p-5 rounded-lg" style={{ backgroundColor: '#DABFFF' }}>
            <img src="/path_to_album_cover.jpg" alt="Album Cover" className="w-full rounded-lg mb-3" />
            <h3 className="text-xl">New Beats</h3>
          </div>
          {/* Add more cards similarly */}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 py-5 border-t text-center" style={{ borderColor: '#4F518C' }}>
        <p>&copy; 2023 MonkeyTunes. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
