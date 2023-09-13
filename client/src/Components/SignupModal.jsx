import React, { useState } from 'react';

function SignupModal({ onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            const response = await fetch('http://localhost:3001/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            console.log(data);
            onClose();
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5 }}>
                <h2 style={{ color: '#000' }}>Signup</h2>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ display: 'block', marginBottom: 10, padding: 5, color: 'black' }} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ display: 'block', marginBottom: 10, padding: 5, color: 'black' }} />
                <button onClick={handleSignup} style={{ padding: 5, margin: 5, color: 'black' }}>Signup</button>
                <button onClick={onClose} style={{ padding: 5, margin: 5, color: 'black' }}>Close</button>
            </div>
        </div>
    );
}

export default SignupModal;