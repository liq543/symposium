import React, { useState } from 'react';

function LoginModal({ onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            console.log(data);
            onClose();
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="block w-full mb-4 p-2 border border-gray-300 rounded-lg text-gray-800"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="block w-full mb-4 p-2 border border-gray-300 rounded-lg text-gray-800"
                />
                <button
                    onClick={handleLogin}
                    className="block w-full mb-2 py-2 px-4 bg-purple-600 text-white rounded-lg font-bold"
                >
                    Login
                </button>
                <button
                    onClick={onClose}
                    className="block w-full py-2 px-4 bg-gray-300 text-gray-800 rounded-lg font-bold"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default LoginModal;