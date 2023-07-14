import { useEffect, useRef } from 'react';

const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  return canvasRef;
};

export default useCanvas;
