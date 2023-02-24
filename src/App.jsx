import { useState } from "react";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPhotos, setUserPhotos] = useState([]);

  const handleLogin = async () =>{

    const tokenResponse = await fetch(
      `https://api.instagram.com/oauth/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}
      &redirect_uri=${import.meta.env.VITE_REDIRECT_URI}
      &scope=user_profile,user_media
      &response_type=code`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      }
    );
    const tokenData = await tokenResponse.json();
    setIsLoggedIn(true);

    
    console.log(tokenData);
  };
  
  return (
    <div className="w-full h-screen">
      <h1 className="p-3 text-center text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 to-yellow-200 text-lg">
        Welcome To Insta-Post
      </h1>
      {!isLoggedIn && <div className="w-full flex justify-center">
        <button className="p-1 text-white bg-blue-400 m-3 rounded-sm">
          Login with Instagram
        </button>
      </div>}
      
    </div>
  );
}

export default App;
