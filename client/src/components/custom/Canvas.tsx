import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const CanvasWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 78%;
  z-index: 10;
`;

const CanvasElement = styled.canvas`
  width: 100%;
  height: 100%;
`;

interface CanvasProps {
  onMouseMove: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  onMouseDown: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
}

const Canvas: React.FC<CanvasProps> = ({ onMouseMove, onMouseDown }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, []);

  return (
    <CanvasWrapper>
      <CanvasElement ref={canvasRef} onMouseMove={onMouseMove} onMouseDown={onMouseDown} />
    </CanvasWrapper>
  );
};

export default Canvas;
