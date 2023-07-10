import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
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

type CanvasWrapperProps = {
  children: React.ReactNode;
  forwardedRef?: React.RefObject<HTMLDivElement>;
  onDragOver: React.DragEventHandler<HTMLDivElement>;
  onDrop: React.DragEventHandler<HTMLDivElement>;
};

const CanvasWrapper: React.FC<CanvasWrapperProps> = ({
  children,
  forwardedRef = React.createRef<HTMLDivElement>(),
  onDragOver,
  onDrop,
}) => {
  return (
    <Wrapper ref={forwardedRef} onDragOver={onDragOver} onDrop={onDrop}>
      {children}
    </Wrapper>
  );
};

type CanvasProps = {
  forwardedRef?: React.RefObject<HTMLCanvasElement>;
  onMouseMove: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  onMouseDown: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  onMouseUp: () => void;
};

const Canvas: React.FC<CanvasProps> = ({
  forwardedRef = React.createRef<HTMLCanvasElement>(),
  onMouseMove,
  onMouseDown,
  onMouseUp,
}) => {
  return (
    <canvas
      ref={forwardedRef}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />
  );
};

export { CanvasWrapper, Canvas };
