import { RefObject } from 'react';
import { addCustom } from '../../../api/customApis';
import { LocalStorage } from '../../../utils/browserStorage';
import { LOCAL_STORAGE_KEY_LIST } from '../../../assets/constantValue/constantValue';
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
  productId: number,
  navigate: (path: string) => void
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

  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');

  if (!tempCtx) {
    console.error('Failed to get 2D context for temporary canvas');
    return;
  }

  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;

  tempCtx.drawImage(canvas, 0, 0);

  const isDataURL = (s: string) => {
    return !!s.match(/^data:image\/([a-zA-Z]*);base64,([^"]*)/);
  };

  const loadAndDrawImage = async (imageData: ImageData) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      if (isDataURL(imageData.imageUrl)) {
        img.src = imageData.imageUrl;
      } else {
        img.src = `${imageData.imageUrl}?timestamp=${new Date().getTime()}`;
      }

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

  const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
  for (let i = 0; i < imageData.data.length; i += 4) {
    if (imageData.data[i + 3] === 0) {
      imageData.data[i] = 255;
      imageData.data[i + 1] = 255;
      imageData.data[i + 2] = 255;
      imageData.data[i + 3] = 255;
    }
  }
  tempCtx.putImageData(imageData, 0, 0);

  const dataUrl = tempCanvas.toDataURL('image/png');

  const byteString = atob(dataUrl.split(',')[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([int8Array], { type: 'image/png' });
  const file = new File([blob], 'canvas.png', { type: 'image/png' });

  const accessToken = LocalStorage.get(LOCAL_STORAGE_KEY_LIST.AccessToken);
  if (accessToken) {
    try {
      await addCustom(storeId, productId, file);
      return true;
    } catch (error) {
      alert('이미지 저장에 실패했습니다.');
      return false;
    }
  } else {
    alert('로그인 먼저 해주세요!');
    navigate('/auth');
    return false;
  }
};
export default saveAsImage;
