import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ColorInput from './ColorInput';
import EraseButton from './EraseButton';
import RangeInput from './RangeInput';
import RangeInputContainer from './RangeInputContainer';
import UploadButton from './UploadButton';
import DragButton from './DragButton';
import DrawButton from './DrawButton';
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

const CanvasWrapper = styled.div`
  background-color: transparent;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 10;

  &:first-child {
    top: 0;
  }

  &:last-child {
    bottom: 0;
  }
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

const CustomContent = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<number>(5);
  const [color, setColor] = useState<string>('#000000');
  const [eraser, setEraser] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const [drawingMode, setDrawingMode] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [dragStartY, setDragStartY] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChangeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(Number(event.target.value));
  };

  const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
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

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (drawingMode && isDragging) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const loadImagePromises = images.map((imageUrl, index) => {
        return new Promise<{ image: HTMLImageElement; xPos: number; yPos: number } | null>(
          (resolve) => {
            const image = new Image();
            image.src = imageUrl;

            image.onload = () => {
              const { naturalWidth, naturalHeight } = image;
              const targetWidth = 300;
              const targetHeight = 300;
              const aspectRatio = naturalWidth / naturalHeight;
              let width = targetWidth;
              let height = targetHeight;
              if (targetWidth / targetHeight > aspectRatio) {
                width = targetHeight * aspectRatio;
              } else {
                height = targetWidth / aspectRatio;
              }
              resolve({
                image,
                xPos: x - dragStartX + 200,
                yPos: y - dragStartY + 200 + index * 50,
              });
            };

            image.onerror = () => {
              resolve(null); // 이미지 로딩 실패 시 null 반환
            };
          }
        );
      });

      Promise.all(loadImagePromises).then((loadedImages) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        loadedImages.forEach((loadedImage) => {
          if (loadedImage) {
            const { image, xPos, yPos } = loadedImage;

            const { naturalWidth, naturalHeight } = image;
            const targetWidth = 300;
            const targetHeight = 300;
            const aspectRatio = naturalWidth / naturalHeight;
            let width = targetWidth;
            let height = targetHeight;
            if (targetWidth / targetHeight > aspectRatio) {
              width = targetHeight * aspectRatio;
            } else {
              height = targetWidth / aspectRatio;
            }
            ctx.drawImage(image, xPos, yPos, width, height);
          }
        });
      });
    } else {
      if (event.buttons !== 1) {
        return;
      }

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
      setDragStartX(x);
      setDragStartY(y);
    }
  };

  const handleEraseButtonClick = () => {
    setEraser(!eraser);
    setDrawingMode(false); // 그리기 모드 비활성화
    setIsDragging(false); // 드래그 상태 해제
  };

  const handleUploadButtonClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setIsLoading(true); // 이미지 로딩 상태로 설정

      const url = URL.createObjectURL(file);
      const image = new Image();
      image.src = url;

      image.onload = () => {
        setImages((prevImages) => [...prevImages, url]);
        setIsLoading(false); // 이미지 로딩 완료 상태로 설정
      };

      image.onerror = () => {
        setIsLoading(false); // 이미지 로딩 실패 상태로 설정
      };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      images.forEach((imageUrl) => {
        const image = new Image();
        image.src = imageUrl;
        image.onload = () => {
          const naturalWidth = image.naturalWidth;
          const naturalHeight = image.naturalHeight;
          const targetWidth = 300;
          const targetHeight = 300;
          const aspectRatio = naturalWidth / naturalHeight;
          let width = targetWidth;
          let height = targetHeight;
          if (targetWidth / targetHeight > aspectRatio) {
            width = targetHeight * aspectRatio;
          } else {
            height = targetWidth / aspectRatio;
          }
          ctx.drawImage(image, 200, 200, width, height);
        };
      });
    }
  }, [images]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      images.forEach((imageUrl) => {
        const image = new Image();
        image.src = imageUrl;
        image.onload = () => {
          // 원본 이미지 원래크기 가져오기
          const naturalWidth = image.naturalWidth;
          const naturalHeight = image.naturalHeight;

          // 원하는 크기 설정
          const targetWidth = 300;
          const targetHeight = 300;

          // 이미지의 비율 계산
          const aspectRatio = naturalWidth / naturalHeight;

          // 비율을 유지하면서 이미지 크기 조정
          let width = targetWidth;
          let height = targetHeight;
          if (targetWidth / targetHeight > aspectRatio) {
            width = targetHeight * aspectRatio;
          } else {
            height = targetWidth / aspectRatio;
          }

          ctx.drawImage(image, 200, 200, width, height);
        };
      });
    }
  }, [images]);
  const handleDrawButtonClick = () => {
    setEraser(false);
    setDrawingMode(true);
    setIsDragging(false);
  };
  const handleToggleDrag = () => {
    setDrawingMode(true); // 그리기 모드 활성화
    setIsDragging((prev) => !prev);
    setEraser(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      images.forEach((imageUrl) => {
        const image = new Image();
        image.src = imageUrl;
        image.onload = () => {
          const naturalWidth = image.naturalWidth;
          const naturalHeight = image.naturalHeight;
          const targetWidth = 300;
          const targetHeight = 300;
          const aspectRatio = naturalWidth / naturalHeight;
          let width = targetWidth;
          let height = targetHeight;
          if (targetWidth / targetHeight > aspectRatio) {
            width = targetHeight * aspectRatio;
          } else {
            height = targetWidth / aspectRatio;
          }
          ctx.drawImage(image, 200, 200, width, height);
        };
      });
    }
  }, [images]);
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  return (
    <ContentContainer>
      <RangeInputContainer>
        <RangeInput id="line-width" value={size} onChange={handleChangeSize} />
        <ColorInput id="line-color" value={color} onChange={handleChangeColor} />
        <EraseButton eraser={eraser} onClick={handleEraseButtonClick} />
        <DrawButton onClick={handleDrawButtonClick} />
        <DragButton onToggleDrag={handleToggleDrag} />
        {!isLoading && <UploadButton id="upload-button" onChange={handleUploadButtonClick} />}
      </RangeInputContainer>
      <CanvasWrapper ref={canvasWrapperRef}>
        <Canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
      </CanvasWrapper>
    </ContentContainer>
  );
};
export default CustomContent;
