import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import ColorInput from './ColorInput';
import EraseButton from './EraseButton';
import RangeInput from './RangeInput';
import RangeInputContainer from './RangeInputContainer';
import UploadButton from './UploadButton';
import DragButton from './DragButton';
import { CanvasWrapper, Canvas } from './CanvasComponent';
import UndoButton from './UndoButton';
const ContentContainer = styled.div`
  margin-left: 20%;
  width: 80%;
  min-height: 100vh;
  background-color: rgba(255, 255, 255);
  backdrop-filter: blur(50px);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const CustomContent: React.FC<{ selectedImageProp: string }> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<number>(5);
  const [color, setColor] = useState<string>('#000000');
  const [eraser, setEraser] = useState<boolean>(false);
  const [images, setImages] = useState<
    { imageUrl: string; x: number; y: number; width: number; height: number }[]
  >([]);
  const [drawingMode, setDrawingMode] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [, setDrawingActions] = useState<{ x: number; y: number; color: string; size: number }[]>(
    []
  );
  const [draggedImage, setDraggedImage] = useState<string | null>(null);
  const [draggedImageIndex, setDraggedImageIndex] = useState<number>(-1);
  const [canvasStates, setCanvasStates] = useState<Array<string>>([]); // 캔버스 상태 저장 배열

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
      const targetWidth = 100; // 변경할 가로 크기
      const targetHeight = 100; // 변경할 세로 크기
      const aspectRatio = naturalWidth / naturalHeight;

      let width = targetWidth;
      let height = targetHeight;

      if (targetWidth / targetHeight > aspectRatio) {
        // 이미지의 가로가 더 긴 경우
        height = targetWidth / aspectRatio;
      } else {
        // 이미지의 세로가 더 긴 경우
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

    // 이미지 영역 내에서 마우스 이동 감지
    const draggedIndex = images.findIndex((imageData) => {
      const { x: imageX, y: imageY, width, height } = imageData;
      return x >= imageX && x <= imageX + width && y >= imageY && y <= imageY + height;
    });

    if (draggedIndex !== -1 && !drawingMode) {
      setIsDragging(true); // 드래그 중임을 나타내는 상태로 설정
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
          // Draw existing images excluding the dragged image
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

      setDrawingActions((prevActions) => [
        ...prevActions,
        { x, y, color: eraser ? 'rgba(0,0,0,1)' : color, size },
      ]);
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
  const handleToggleDrag = () => {
    setDrawingMode(true);
    setIsDragging((prev) => !prev);
    setEraser(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedImage(null);
    setDraggedImageIndex(-1);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasWrapper = canvasWrapperRef.current;
    if (canvas && canvasWrapper) {
      canvas.width = canvasWrapper.clientWidth;
      canvas.height = canvasWrapper.clientHeight;
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
    setDraggedImageIndex(-1);
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

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const image = new Image();

    // 이미지가 로딩이 끝난 후에 실행되는 함수
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

      // 이미지 정보를 저장합니다.
      setImages((prevImages) => [
        ...prevImages,
        {
          imageUrl: image.src,
          x: x - width / 2,
          y: y - height / 2,
          width: width,
          height: height,
        },
      ]);
    };

    image.src = imageUrl;

    setDraggedImage(null);
    setDraggedImageIndex(-1);
  };
  const handleUndoButtonClick = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (images.length > 0) {
      // Remove the last image from the images array
      const updatedImages = [...images];
      updatedImages.splice(-1, 1);
      setImages(updatedImages);

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Redraw the remaining images
    }

    // Reset dragged image and index
    setDraggedImage(null);
    setDraggedImageIndex(-1);
  };

  return (
    <ContentContainer>
      <RangeInputContainer>
        <RangeInput id="line-width" value={size} onChange={handleChangeSize} />
        <ColorInput id="line-color" value={color} onChange={handleChangeColor} />
        <EraseButton eraser={eraser} onClick={handleEraseButtonClick} />
        <DragButton onToggleDrag={handleToggleDrag} />
        <UploadButton id="upload-button" onUpload={handleUploadImage} />
        <UndoButton onUndo={handleUndoButtonClick} /> {/* UndoButton 추가 */}
      </RangeInputContainer>
      <CanvasWrapper
        forwardedRef={canvasWrapperRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
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
          />
        ))}
        {draggedImage && (
          <img
            src={draggedImage}
            alt="Dragged Image"
            draggable
            onDragStart={(event) => handleDragStartImage(event, draggedImage, draggedImageIndex)}
            style={{
              position: 'absolute',
              left: 20,
              top: 0,
              pointerEvents: 'none',
            }}
          />
        )}
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
