import { useState, useEffect } from "react";

import "./App.css";
import PostGallery from "./components/PostGallery";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (location.href.includes("code")) {
      const params = Object.fromEntries(
        new URL(window.location.href).searchParams
      );

      fetch("https://insta-photos.onrender.com" + "?code=" + params.code)
        .then((r) => r.json())
        .then((r) => {
          const url = `https://graph.instagram.com/me/media?fields=id,media_url,caption,permalink&access_token=${r.access_token}`;

          fetch(url)
            .then((r) => r.json())
            .then((r) => {
              setUserPosts(r.data);
              setIsLoggedIn(true);
            });
        });
    }
  }, []);

  const handleLogin = async () => {
    const url = `https://api.instagram.com/oauth/authorize?client_id=${
      import.meta.env.VITE_CLIENT_ID
    }&redirect_uri=${
      import.meta.env.VITE_REDIRECT_URI
    }&scope=user_profile,user_media&response_type=code`;

    window.location.replace(url);
  };

  return (
    <div className="w-full h-screen">
      <h1 className="p-3 text-center text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-lg">
        Welcome To Insta-Post
      </h1>
      {!isLoggedIn && (
        <div className="w-full flex justify-center">
          <button
            className="p-1 text-white bg-blue-400 m-3 rounded-sm"
            onClick={() => handleLogin()}
          >
            Login with Instagram
          </button>
        </div>
      )}

      <PostGallery images={userPosts} />
    </div>
  );
}

export default App;
