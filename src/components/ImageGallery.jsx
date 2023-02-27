import React from "react";
import Image from "./Image";

const ImageGallery = ({images}) => {
  return <div className="image-gallery w-[80%] h-auto mx-auto my-0 grid grid-cols-4 justify-center gap-2">
    {images.map(image => (
        <Image image={image}/>
    ))}
  </div>;
};

export default ImageGallery;
