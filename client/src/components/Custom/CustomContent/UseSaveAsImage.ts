import { RefObject } from 'react';
import { addCustom } from '../../../api/customApis';

type ImageData = {
  imageUrl: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

const saveAsImage = async (
  images: ImageData[],
  canvasRef: RefObject<HTMLCanvasElement>,
  storeId: number,
  productId: number
) => {
  const canvas = canvasRef.current;
  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Context 2D is not available');
    return;
  }

  // Create a temporary canvas
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');

  if (!tempCtx) {
    console.error('Failed to get 2D context for temporary canvas');
    return;
  }

  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;

  // Draw the original canvas onto the temporary one
  tempCtx.drawImage(canvas, 0, 0);

  // Load and draw each image onto the canvas
  const loadAndDrawImage = async (imageData: ImageData) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = `${imageData.imageUrl}?timestamp=${new Date().getTime()}`;
      img.onload = () => {
        tempCtx.drawImage(img, imageData.x, imageData.y, imageData.width, imageData.height);
        resolve();
      };
      img.onerror = () => {
        reject(new Error(`Failed to load image at ${imageData.imageUrl}`));
      };
    });
  };

  await Promise.all(images.map(loadAndDrawImage));

  // Iterate over every pixel
  // Iterate over every pixel
  // Iterate over every pixel
  const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
  for (let i = 0; i < imageData.data.length; i += 4) {
    // If the pixel is transparent, color it white
    if (imageData.data[i + 3] === 0) {
      imageData.data[i] = 255; // red
      imageData.data[i + 1] = 255; // green
      imageData.data[i + 2] = 255; // blue
      imageData.data[i + 3] = 255; // alpha
    }
  }
  // Put the modified image data back onto the temporary canvas
  tempCtx.putImageData(imageData, 0, 0);

  // Get a data URL of the image from the temporary canvas
  const dataUrl = tempCanvas.toDataURL('image/png');

  const byteString = atob(dataUrl.split(',')[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([int8Array], { type: 'image/png' });
  const file = new File([blob], 'canvas.png', { type: 'image/png' });

  try {
    await addCustom(storeId, productId, file);
    return true;
  } catch (error) {
    alert('이미지 저장에 실패했습니다.');
    return false;
  }
};

export default saveAsImage;
