import React, { useState, useEffect } from 'react';
import ColorInput from './ColorInput';
import EraseButton from './EraseButton';
import RangeInput from './RangeInput';
import RangeInputContainer from './RangeInputcontainer';
import UploadButton from './UploadButton';
import { CanvasWrapper, Canvas } from './CanvasComponent';
import UndoButton from './UndoButton';
import RedoButton from './RedoButton';
import { ContentContainer } from './ContentContainer';

type ImageData = {
  imageUrl: string;
  x: number;
  y: number;
  width: number;
  height: number;
};
type PenDrawing = {
  color: string;
  size: number;
  lines: { x: number; y: number }[];
};
const CustomContent: React.FC<{
  canvasRef: React.RefObject<HTMLCanvasElement>;
  updateImages: React.Dispatch<React.SetStateAction<ImageData[]>>;
}> = ({ canvasRef, updateImages }) => {
  const [size, setSize] = useState<number>(5);
  const [color, setColor] = useState<string>('#000000');
  const [eraser, setEraser] = useState<boolean>(false);
  const [images, setImages] = useState<ImageData[]>([]);
  const [penDrawings, setPenDrawings] = useState<PenDrawing[]>([]);
  const [drawingMode, setDrawingMode] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [, setDraggedImage] = useState<string | null>(null);
  const [draggedImageIndex, setDraggedImageIndex] = useState<number>(-1);
  const [undoMode] = useState<'image' | 'drawing'>('image');
  const [redoMode, setRedoMode] = useState<'image' | 'drawing' | 'none'>('none');
  const [redoImages, setRedoImages] = useState<ImageData[]>([]);
  const [redoPenDrawings, setRedoPenDrawings] = useState<PenDrawing[]>([]);

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
      const targetWidth = 250;
      const targetHeight = 250;
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
      updateImages(newImages);
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

    if (isDragging && draggedImageIndex >= 0) {
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
      updateImages(newImages); // updateImages 함수를 사용하여 state 업데이트
    } else {
      if (event.buttons !== 1) return;

      ctx.globalCompositeOperation = eraser ? 'destination-out' : 'source-over';
      ctx.lineWidth = size;
      ctx.strokeStyle = eraser ? 'rgba(0,0,0,1)' : color;
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // 캔버스 상태 저장
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempCtx.drawImage(canvas, 0, 0);

      // 캔버스 크기 조정
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 펜 상태 재설정
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = size;
      ctx.strokeStyle = color;
      ctx.globalCompositeOperation = eraser ? 'destination-out' : 'source-over';

      ctx.drawImage(tempCanvas, 0, 0);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

      const draggedIndex = images.findIndex((imageData) => {
        const { x: imageX, y: imageY, width, height } = imageData;
        return x >= imageX && x <= imageX + width && y >= imageY && y <= imageY + height;
      });

      if (draggedIndex !== -1 && !drawingMode) {
        setIsDragging(true);
        setDraggedImageIndex(draggedIndex);
      } else {
        setIsDragging(true);
      }
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
      // Make sure the canvas dimensions match its CSS size
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

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

    if (index === draggedImageIndex) {
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
      updateImages(newImages); // updateImages 함수를 사용하여 state 업데이트
    }
  };

  const handleImageDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragStartImage = (
    _event: React.DragEvent<HTMLImageElement>,
    _imageUrl: string,
    index: number
  ) => {
    setDraggedImageIndex(index);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const imageUrl = event.dataTransfer.getData('text/plain');

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const image = new Image();
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

      const newImages = [
        ...images,
        {
          imageUrl: image.src,
          x: x - width / 2,
          y: y - height / 2,
          width: width,
          height: height,
        },
      ];

      setImages(newImages);
      updateImages(newImages); // updateImages 함수를 사용하여 state 업데이트
    };

    image.src = imageUrl;

    setDraggedImage(null);
    setDraggedImageIndex(-1);
  };

  const handleUndoButtonClick = () => {
    if (undoMode === 'image' && images.length > 0) {
      const updatedImages = [...images];
      const lastImage = updatedImages.pop();

      if (lastImage) {
        // lastImage가 undefined가 아닌지 확인
        setImages(updatedImages);
        updateImages(updatedImages);
        setRedoImages([lastImage, ...redoImages]);
        setRedoMode('image');
      }
    } else if (undoMode === 'drawing' && penDrawings.length > 0) {
      const updatedPenDrawings = [...penDrawings];
      const lastPenDrawing = updatedPenDrawings.pop();

      if (lastPenDrawing) {
        // lastPenDrawing이 undefined가 아닌지 확인
        setPenDrawings(updatedPenDrawings);
        setRedoPenDrawings([lastPenDrawing, ...redoPenDrawings]);
        setRedoMode('drawing');
      }
    }

    setDraggedImage(null);
    setDraggedImageIndex(-1);
  };

  const handleRedoButtonClick = () => {
    if (redoMode === 'image' && redoImages.length > 0) {
      const updatedRedoImages = [...redoImages];
      const redoImage = updatedRedoImages.shift();

      if (redoImage) {
        // redoImage가 undefined가 아닌지 확인
        setImages([redoImage, ...images]);
        updateImages([redoImage, ...images]);
        setRedoImages(updatedRedoImages);
      }
    } else if (redoMode === 'drawing' && redoPenDrawings.length > 0) {
      const updatedRedoPenDrawings = [...redoPenDrawings];
      const redoPenDrawing = updatedRedoPenDrawings.shift();

      if (redoPenDrawing) {
        // redoPenDrawing이 undefined가 아닌지 확인
        setPenDrawings([redoPenDrawing, ...penDrawings]);
        setRedoPenDrawings(updatedRedoPenDrawings);
      }
    }

    if (redoImages.length === 0 && redoPenDrawings.length === 0) {
      setRedoMode('none');
    }
  };

  return (
    <ContentContainer>
      <RangeInputContainer>
        <RangeInput value={size} onChange={handleChangeSize} />
        <ColorInput value={color} onChange={handleChangeColor} />
        <EraseButton eraser={eraser} onClick={handleEraseButtonClick} />
        <UploadButton onUpload={handleUploadImage} />
        <UndoButton onUndo={handleUndoButtonClick} />
        <RedoButton onRedo={handleRedoButtonClick} /> {/* RedoButton 추가 */}
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
