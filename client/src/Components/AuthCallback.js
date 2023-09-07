// AuthCallback.js

import { useEffect } from 'react';
import axios from 'axios';

const AuthCallback = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = params.get('access_token');
    if (accessToken) {
      // Store this token in local storage or context for later use
      localStorage.setItem('spotify_access_token', accessToken);
      window.location = "/player";
    }
  }, []);

  return <div>Authenticating...</div>;
};

export default AuthCallback;
