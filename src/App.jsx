import { useState } from "react";

import "./App.css";

import React, { useState } from "react";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPhotos, setUserPhotos] = useState([]);

  const handleLogin = async () => {
    const redirectURI = encodeURIComponent(import.meta.env.VITE_REDIRECT_URI);
    const authURL = `https://api.instagram.com/oauth/authorize?client_id=YOUR_APP_ID&redirect_uri=${redirectURI}&scope=user_photos&response_type=code`;
    window.location.href = authURL;
  };

  const handleAuthCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    const tokenResponse = await fetch(
      `https://api.instagram.com/oauth/access_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: import.meta.env.VITE_CLIENT_ID,
          client_secret: import.meta.env.VITE_CLIENT_SECRET,
          grant_type: "authorization_code",
          redirect_uri: import.meta.env.VITE_REDIRECT_URI,
          code: code,
        }),
      }
    );
    const tokenData = await tokenResponse.json();
    setIsLoggedIn(true);

    const mediaResponse = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url&access_token=${tokenData.access_token}`
    );
    const mediaData = await mediaResponse.json();
    setUserPhotos(mediaData.data);
  };

  if (!isLoggedIn) {
    if (window.location.search.includes("code")) {
      handleAuthCallback();
    } else {
      return <button onClick={handleLogin}>Login with Instagram</button>;
    }
  }

  return (
    <div>
      {userPhotos.map((photo) => (
        <img key={photo.id} src={photo.media_url} />
      ))}
    </div>
  );
};

export default App;

