import React, { useState } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import upload from '../../assets/images/img_modal/upload.png';
import ColorInput from './ColorInput';
import EraseButton from './EraseButton';
import RangeInput from './RangeInput';
import RangeInputContainer from './RangeInputContainer';
import UploadButton from './UploadButton';

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
  position: absolute;
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

  const handleChangeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(Number(event.target.value));
  };

  const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  React.useEffect(() => {
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
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (event.buttons !== 1) return;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        const target = eraser ? 'destination-out' : 'source-over';
        ctx.globalCompositeOperation = target;
        ctx.lineWidth = size;

        if (eraser) {
          ctx.strokeStyle = 'rgba(0,0,0,1)';
          // destination-out 때문에 적용(인터넷익스플로러 호환성)
          const temp = ctx.fillStyle;
          ctx.fillStyle = 'rgba(0,0,0,0)';
          ctx.fillRect(x, y, size, size);
          // destination-out 때문에 적용
          ctx.fillStyle = temp;
        } else {
          ctx.strokeStyle = color;
        }

        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = canvasRef.current;
    if (canvas) {
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
          // destination-out 때문에 적용(인터넷익스플로러 호환성)
          const temp = ctx.fillStyle;
          ctx.fillStyle = 'rgba(0,0,0,0)';
          ctx.fillRect(x - eraserWidth / 2, y - eraserWidth / 2, eraserWidth, eraserWidth);
          // destination-out 때문에 적용
          ctx.fillStyle = temp;
        }
      }
    }
  };

  const handleEraseButtonClick = () => {
    setEraser((prev) => !prev);
  };

  const handleUploadButtonClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // 선택된 파일

    if (file) {
      const url = URL.createObjectURL(file);
      const image = new Image();
      image.src = url;
      image.onload = function () {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // Reset the canvas before drawing the uploaded image
            ctx.clearRect(0, 0, canvas.width, canvas.height);

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
          }
        }
      };
    }
  };

  return (
    <ContentContainer>
      <RangeInputContainer>
        <RangeInput id="line-width" value={size} onChange={handleChangeSize} />
        <ColorInput id="line-color" value={color} onChange={handleChangeColor} />
        <EraseButton eraser={eraser} onClick={handleEraseButtonClick} />
        <UploadButton id="upload-button" onChange={handleUploadButtonClick} />
      </RangeInputContainer>
      <CanvasWrapper ref={canvasWrapperRef}>
        <Canvas ref={canvasRef} onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} />
      </CanvasWrapper>
    </ContentContainer>
  );
};

export default CustomContent;
