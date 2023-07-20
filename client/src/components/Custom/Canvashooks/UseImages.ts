import { useState } from 'react';

interface ImageData {
  imageUrl: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const useImages = () => {
  const [images, setImages] = useState<ImageData[]>([]);

  const addImage = (imageUrl: string, x: number, y: number, width: number, height: number) => {
    setImages((prevImages) => [
      ...prevImages,
      {
        imageUrl,
        x,
        y,
        width,
        height,
      },
    ]);
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const updateImagePosition = (index: number, x: number, y: number) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = {
        ...prevImages[index],
        x,
        y,
      };
      return updatedImages;
    });
  };

  return {
    images,
    addImage,
    removeImage,
    updateImagePosition,
  };
};

export default useImages;
