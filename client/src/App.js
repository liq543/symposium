import React from 'react';
import 'tailwindcss/tailwind.css';

import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import MainView from './Components/MainView';
import Footer from './Components/Footer';

const App = () => {
    return (
        <div style={{ backgroundColor: '#2C2A4A' }} className="min-h-screen text-white">
            <Header />
            <div className="flex mt-10 px-8">
                <Sidebar />
                <MainView />
            </div>
            <Footer />
        </div>
    );
}

export default App;
