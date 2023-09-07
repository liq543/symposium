import React from 'react';
import 'tailwindcss/tailwind.css';

const App = () => {
  return (
    <div style={{ backgroundColor: '#2C2A4A' }} className="min-h-screen text-white">
      
      {/* Header */}
      <div className="py-5 px-8 flex justify-between items-center border-b" style={{ borderColor: '#4F518C' }}>
        <div className="flex items-center">
          <img src="/path_to_symposium_logo.png" alt="Logo" className="w-10 h-10 mr-3" />
          <h1 className="text-3xl font-bold">Symposium</h1>
        </div>
        <div className="space-x-4">
          <button className="px-5 py-2 rounded-full hover:bg-DABFFF" style={{ backgroundColor: '#907AD6' }}>Login</button>
          <button className="px-5 py-2 rounded-full hover:bg-DABFFF" style={{ backgroundColor: '#907AD6' }}>Sign Up</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex mt-10 px-8">

        {/* Sidebar - Playlists */}
        <div className="w-1/4 space-y-6 pr-6">
          <input type="text" placeholder="Search for music..." className="w-full p-4 rounded-full outline-none" style={{ backgroundColor: '#4F518C' }} />

          <h2 className="text-2xl font-bold mb-4">Your Playlists</h2>
          {/* Sample Playlist */}
          <div className="text-lg p-3 hover:bg-DABFFF rounded-lg cursor-pointer">Chill Vibes</div>
          {/* Add more playlists similarly */}
        </div>

        {/* Main Songs View */}
        <div className="w-3/4 space-y-10 pl-6">

          {/* Featured Playlists */}
          <div>
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
          <div>
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

        </div>

      </div>

      {/* Footer */}
      <footer className="mt-10 py-5 border-t text-center" style={{ borderColor: '#4F518C' }}>
        <p>&copy; Symposium. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;
