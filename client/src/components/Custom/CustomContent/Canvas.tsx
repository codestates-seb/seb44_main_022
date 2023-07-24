import React from 'react';

type CanvasProps = {
  forwardedRef?: React.RefObject<HTMLCanvasElement>;
  onMouseMove: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  onMouseDown: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  onMouseUp: () => void;
};

const Canvas = ({
  forwardedRef = React.createRef<HTMLCanvasElement>(),
  onMouseMove,
  onMouseDown,
  onMouseUp,
}: CanvasProps) => {
  return (
    <canvas
      ref={forwardedRef}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />
  );
};

export default Canvas;
