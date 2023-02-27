import React from "react";
import Post from "./Post";
import Image from "./Post";

const PostGallery = ({images}) => {
  return <div className="image-gallery w-[80%] h-auto mx-auto my-0 grid grid-cols-4 justify-center gap-2">
    {images.map(image => (
        <Post image={image}/>
    ))}
  </div>;
};

export default PostGallery;
