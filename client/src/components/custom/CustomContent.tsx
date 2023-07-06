import React, { useState } from 'react';
import styled from 'styled-components';

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
  top: 0;
  left: 0;
  width: 100%;
  height: 78%;
  z-index: 10;
`;
const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;
const RangeInputContainer = styled.div`
  background-color: transparent;
  position: absolute;
  width: 100%;
  bottom: 35%;
  left: 0;
  display: flex;
  justify-content: center;
  z-index: 15;
`;

const RangeInput = styled.input.attrs({
  type: 'range',
  min: '1',
  max: '100',
})`
  position: relative;
  z-index: 20;
  -webkit-appearance: none;
  background-color: blue;
  border-radius: 10px;
  height: 8px;
  width: 55%;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 17px;
    height: 17px;
    background-color: var(--dark-purple);
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: yellow;
    cursor: pointer;
  }

  &:focus {
    animation: 1s pulse infinite;
    outline: none;
  }

  &:hover {
    background-color: var(--purple);
  }

  background-color: var(--light-purple);
  top: calc(5px + 50%);

  transition: background-color 0.2s ease-in-out, top 0.2s ease-in-out;
`;
const ColorInput = styled.input.attrs({
  type: 'color',
})<{ value: string }>`
  position: relative;
  z-index: 20;
  height: 25px;
  margin-left: 20px;

  &::-webkit-color-swatch {
    position: absolute;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 3px;
    padding: 0;
    pointer-events: none;
  }

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &:focus {
    animation: 1s pulse infinite;
    outline: none;
  }
`;
const EraseButton = styled.button`
  position: relative;
  z-index: 20;
  width: 25px;
  height: 25px;
  margin-left: 20px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background-color: var(--light-gray);

  &:hover {
    background-color: var(--gray);
  }

  &:focus {
    animation: 1s pulse infinite; // 애니메이션
    outline: none;
  }
`;
const CustomContent: React.FC = () => {
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
      }
    }
  };
  return (
    <ContentContainer>
      <RangeInputContainer>
        <RangeInput id="line-width" value={size} onChange={handleChangeSize} />
        <ColorInput id="line-color" value={color} onChange={handleChangeColor} />
        <EraseButton onClick={() => setEraser(true)}></EraseButton>
      </RangeInputContainer>
      {/* Canvas 추가 */}
      <CanvasWrapper ref={canvasWrapperRef}>
        <Canvas ref={canvasRef} onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} />
      </CanvasWrapper>
    </ContentContainer>
  );
};

export default CustomContent;
