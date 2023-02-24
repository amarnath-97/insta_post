import React from "react";
import Image from "./Image";

const ImageGallery = ({images}) => {
  return <div className="image-gallery w-full h-auto grid grid-cols-3 gap-2">
    {images.map(image => (
        <Image image={image}/>
    ))}
  </div>;
};

export default ImageGallery;
