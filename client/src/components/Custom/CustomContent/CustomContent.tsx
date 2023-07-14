import React, { useState, useEffect, useRef } from 'react';
import { addCustom } from '../../../api/customApis';
import ColorInput from './ColorInput';
import EraseButton from './EraseButton';
import RangeInput from './RangeInput';
import RangeInputContainer from './RangeInputContainer';
import UploadButton from './UploadButton';
import { CanvasWrapper, Canvas } from './CanvasComponent';
import UndoButton from './UndoButton';
import { ContentContainer } from './ContentContainer';

export const saveCanvasAsImage = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  // Canvas를 이미지로 변환합니다.
  const image = new Image();
  image.src = canvas.toDataURL('image/png');

  // 이미지를 그림 파일로 저장합니다.
  const link = document.createElement('a');
  link.href = image.src;
  link.download = 'canvas_image.png';
  link.click();
};

const CustomContent: React.FC<{ selectedImageProp: string }> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState<number>(5);
  const [color, setColor] = useState<string>('#000000');
  const [eraser, setEraser] = useState<boolean>(false);
  const [images, setImages] = useState<
    { imageUrl: string; x: number; y: number; width: number; height: number }[]
  >([]);
  const [drawingMode, setDrawingMode] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggedImage, setDraggedImage] = useState<string | null>(null);
  const [draggedImageIndex, setDraggedImageIndex] = useState<number>(-1);

  const handleChangeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(Number(event.target.value));
  };

  const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  const handleUploadImage = (imageUrl: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDragging(false);

    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      const { naturalWidth, naturalHeight } = image;
      const targetWidth = 100;
      const targetHeight = 100;
      const aspectRatio = naturalWidth / naturalHeight;

      let width = targetWidth;
      let height = targetHeight;

      if (targetWidth / targetHeight > aspectRatio) {
        height = targetWidth / aspectRatio;
      } else {
        width = targetHeight * aspectRatio;
      }

      const newImages = [
        ...images,
        {
          imageUrl: image.src,
          x: 250,
          y: 250,
          width: width,
          height: height,
        },
      ];

      setImages(newImages);
    };
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const draggedIndex = images.findIndex((imageData) => {
      const { x: imageX, y: imageY, width, height } = imageData;
      return x >= imageX && x <= imageX + width && y >= imageY && y <= imageY + height;
    });

    if (draggedIndex !== -1 && !drawingMode) {
      setIsDragging(true);
      setDraggedImageIndex(draggedIndex);
    } else if (isDragging && draggedImageIndex >= 0) {
      const draggedImage = images[draggedImageIndex];

      const newImages = images.map((imageData, index) => {
        if (index === draggedImageIndex) {
          return {
            ...imageData,
            x: x - draggedImage.width / 2,
            y: y - draggedImage.height / 2,
          };
        }
        return imageData;
      });

      setImages(newImages);
    } else if (!drawingMode && isDragging && draggedImage) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      images.forEach((imageData, index) => {
        if (index !== draggedImageIndex) {
          const img = new Image();
          img.src = imageData.imageUrl;
          img.onload = () => {
            const { naturalWidth, naturalHeight } = img;
            const targetWidth = 100;
            const targetHeight = 100;
            const aspectRatio = naturalWidth / naturalHeight;
            let width = targetWidth;
            let height = targetHeight;
            if (targetWidth / targetHeight > aspectRatio) {
              width = targetHeight * aspectRatio;
            } else {
              height = targetWidth / aspectRatio;
            }
            ctx.drawImage(img, imageData.x, imageData.y, width, height);
          };
        }
      });

      const draggedImage = images[draggedImageIndex];
      const image = new Image();
      image.src = draggedImage.imageUrl;

      image.onload = () => {
        const { naturalWidth, naturalHeight } = image;
        const targetWidth = 100;
        const targetHeight = 100;
        const aspectRatio = naturalWidth / naturalHeight;
        let width = targetWidth;
        let height = targetHeight;
        if (targetWidth / targetHeight > aspectRatio) {
          width = targetHeight * aspectRatio;
        } else {
          height = targetWidth / aspectRatio;
        }
        ctx.drawImage(image, x - width / 2, y - height / 2, width, height);
      };
    } else {
      if (event.buttons !== 1) return;

      ctx.globalCompositeOperation = eraser ? 'destination-out' : 'source-over';
      ctx.lineWidth = size;
      ctx.strokeStyle = eraser ? 'rgba(0,0,0,1)' : color;
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = canvasRef.current;
    if (canvas && !drawingMode) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        const target = eraser ? 'destination-out' : 'source-over';
        ctx.globalCompositeOperation = target;
        ctx.beginPath();
        ctx.moveTo(x, y);
        if (eraser) {
          const eraserWidth = ctx.lineWidth + 2;
          const temp = ctx.fillStyle;
          ctx.fillStyle = 'rgba(0,0,0,0)';
          ctx.fillRect(x - eraserWidth / 2, y - eraserWidth / 2, eraserWidth, eraserWidth);
          ctx.fillStyle = temp;
        }
      }

      setIsDragging(true);
    }
  };

  const handleEraseButtonClick = () => {
    setEraser(!eraser);
    setDrawingMode(false);
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedImage(null);
    setDraggedImageIndex(-1);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, []);

  const handleImageDrag = (event: React.DragEvent<HTMLImageElement>, index: number) => {
    event.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { clientX, clientY } = event;
    const rect = canvas.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;

    const newImages = images.map((imageData, i) => {
      if (i === index) {
        return {
          ...imageData,
          x: offsetX - imageData.width / 2,
          y: offsetY - imageData.height / 2,
        };
      }
      return imageData;
    });

    setImages(newImages);
  };

  const handleImageDragEnd = () => {
    setIsDragging(false);
  };
  const handleDragStartImage = (
    event: React.DragEvent<HTMLImageElement>,
    imageUrl: string,
    index: number
  ) => {
    event.dataTransfer.setData('text/plain', imageUrl);
    event.dataTransfer.setData('application/my-app-type', 'image');
    setDraggedImageIndex(index);
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const imageUrl = event.dataTransfer.getData('text/plain');
    const draggedIndex = draggedImageIndex;

    // 이미지를 드롭한 위치의 좌표
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // 드래그한 이미지의 정보
    const draggedImage = images[draggedIndex];

    // 드래그한 이미지의 위치만 변경하여 새로운 images 배열
    const newImages = images.map((imageData, index) => {
      if (index === draggedIndex) {
        return {
          ...imageData,
          x: x - draggedImage.width / 2,
          y: y - draggedImage.height / 2,
        };
      }
      return imageData;
    });

    setImages(newImages);

    setDraggedImage(null);
    setDraggedImageIndex(-1);
  };

  const handleUndoButtonClick = () => {
    if (images.length > 0) {
      const updatedImages = [...images];
      updatedImages.pop();
      setImages(updatedImages);

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    setDraggedImage(null);
    setDraggedImageIndex(-1);
  };

  return (
    <ContentContainer>
      <RangeInputContainer>
        <RangeInput value={size} onChange={handleChangeSize} />
        <ColorInput value={color} onChange={handleChangeColor} />
        <EraseButton eraser={eraser} onClick={handleEraseButtonClick} />
        <UploadButton onUpload={handleUploadImage} />
        <UndoButton onUndo={handleUndoButtonClick} />
      </RangeInputContainer>
      <CanvasWrapper onDragOver={handleDragOver} onDrop={handleDrop}>
        {images.map((imageData, index) => (
          <img
            key={index}
            src={imageData.imageUrl}
            alt="Dragged Image"
            draggable={!isDragging}
            onDrag={(event) => handleImageDrag(event, index)}
            onDragEnd={handleImageDragEnd}
            style={{
              position: 'absolute',
              left: `${imageData.x}px`,
              top: `${imageData.y}px`,
              pointerEvents: isDragging ? 'none' : 'auto',
            }}
            onDragStart={(event) => handleDragStartImage(event, imageData.imageUrl, index)}
          />
        ))}
        <Canvas
          forwardedRef={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
      </CanvasWrapper>
    </ContentContainer>
  );
};

export default CustomContent;
