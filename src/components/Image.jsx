import React from "react";

const Image = ({ image }) => {
  return (
    <div className="image w-[300px]">
      <img src={image.media_url} alt="2432" className="w-full h-full" />
    </div>
  );
};

export default Image;
