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
    console.error('Canvas is not available');
    return;
  }

  const originalCanvas = document.createElement('canvas');
  originalCanvas.width = canvas.width;
  originalCanvas.height = canvas.height;
  const originalContext = originalCanvas.getContext('2d');
  originalContext?.drawImage(canvas, 0, 0);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Context 2D is not available');
    return;
  }

  const loadAndDrawImage = (imageData: ImageData): Promise<void> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageData.imageUrl;
      img.onload = () => {
        ctx.drawImage(img, imageData.x, imageData.y, imageData.width, imageData.height);
        resolve();
      };
    });
  };

  const promises = images.map((imageData: ImageData) => loadAndDrawImage(imageData));

  await Promise.all(promises);

  ctx.drawImage(originalCanvas, 0, 0);
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
    alert('이미지를 성공적으로 저장했습니다.');
  } catch (error) {
    alert('이미지 저장에 실패했습니다.');
  }
};

export default saveAsImage;
