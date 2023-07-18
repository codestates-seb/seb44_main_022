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

  const loadAndDrawImage = (imageData: ImageData): Promise<void> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageData.imageUrl;
      img.onload = () => {
        ctx.drawImage(img, imageData.x, imageData.y);
        resolve();
      };
    });
  };

  const promises = images.map((imageData: ImageData) => loadAndDrawImage(imageData));

  await Promise.all(promises);

  const dataUrl = canvas.toDataURL('image/png');
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
