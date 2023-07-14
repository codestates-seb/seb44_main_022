import { useCallback, useState } from 'react';
import { addCustom } from '../../../api/customApis';

export type ImageData = {
  imageUrl: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

const useSaveImage = (canvasRef: React.RefObject<HTMLCanvasElement>, images: ImageData[]) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<Error | null>(null);

  const handleSaveAsImage = useCallback(async () => {
    setIsSaving(true);
    if (!canvasRef.current) {
      console.error('Canvas is not yet available');
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;

    const originalCanvas = document.createElement('canvas');
    originalCanvas.width = canvas.width;
    originalCanvas.height = canvas.height;
    const originalContext = originalCanvas.getContext('2d');
    originalContext?.drawImage(canvas, 0, 0);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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
      const store_id = 1;
      const product_id = 1;
      await addCustom(store_id, product_id, file);
      alert('이미지 업로드성공');
    } catch (error: any) {
      setSaveError(error);
      alert('이미지 업로드실패');
    } finally {
      setIsSaving(false);
    }
  }, [canvasRef, images]);

  return { isSaving, saveError, handleSaveAsImage };
};

export default useSaveImage;
