import React from "react";

const Post = ({ image }) => {
  return (
    <div className="image w-[300px]">
      <img src={image.media_url} alt="" className="w-full h-full" />
    </div>
  );
};

export default Post;
