import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="py-5 px-8 flex justify-between items-center border-b" style={{ borderColor: '#4F518C' }}>
            <div className="flex items-center">
                <img src="/images/largesymp.png" alt="Logo" className="w-10 h-10" />
                <h1 className="text-3xl font-bold -ml-2" style={{ color: '#DABFFF' }}>ymposium</h1>
            </div>
            </div>
    );
};

export default Header;