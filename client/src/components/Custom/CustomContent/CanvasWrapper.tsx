import React from 'react';

type CanvasWrapperProps = {
  children: React.ReactNode;
  forwardedRef?: React.RefObject<HTMLDivElement>;
  onDragOver: React.DragEventHandler<HTMLDivElement>;
  onDrop: React.DragEventHandler<HTMLDivElement>;
};

const CanvasWrapper = ({
  children,
  forwardedRef = React.createRef<HTMLDivElement>(),
  onDragOver,
  onDrop,
}: CanvasWrapperProps) => {
  return (
    <div ref={forwardedRef} onDragOver={onDragOver} onDrop={onDrop}>
      {children}
    </div>
  );
};

export default CanvasWrapper;
