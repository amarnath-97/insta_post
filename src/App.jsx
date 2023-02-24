import { useState } from "react";
import InstagramAPI from 'instagram-private-api';
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPhotos, setUserPhotos] = useState([]);

  const handleLogin = async () =>{
    const ig = new InstagramAPI.IgApiClient();
    ig.state.generateDevice(import.meta.env.VITE_IG_USERNAME);

    const auth = await ig.account.login(import.meta.env.VITE_IG_USERNAME, import.meta.env.VITE_IG_PASSWORD);
    setIsLoggedIn(true);

    const feed = await ig.feed.user(auth.pk);
    const items = await feed.items();
    setUserPhotos(items);
  }
  
  return (
    <div className="w-full h-screen">
      <p>{import.meta.env.VITE_IG_USERNAME}</p>
      <p>{import.meta.env.VITE_IG_PASSWORD}</p>
      <h1 className="p-3 text-center text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 to-yellow-200 text-lg">
        Welcome To Insta-Post
      </h1>
      {!isLoggedIn && <div className="w-full flex justify-center">
        <button className="p-1 text-white bg-blue-400 m-3 rounded-sm">
          Login with Instagram
        </button>
      </div>}

      {isLoggedIn && (
        <div>
          {userPhotos.map((photo) => (
            <img key={photo.id} src={photo.image_versions2.candidates[0].url} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
