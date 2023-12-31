import React from 'react';
import styled from 'styled-components';
import { CanvasComponentWrapper } from './CanvasComponentWrapper';

export const StyledCanvas = styled.canvas`
  width: 100%;
  height: 77%;
`;
type CanvasWrapperProps = {
  children: React.ReactNode;
  forwardedRef?: React.RefObject<HTMLDivElement>;
  onDragOver: React.DragEventHandler<HTMLDivElement>;
  onDrop: React.DragEventHandler<HTMLDivElement>;
};

function CanvasWrapper({
  children,
  forwardedRef = React.createRef<HTMLDivElement>(),
  onDragOver,
  onDrop,
}: CanvasWrapperProps) {
  return (
    <CanvasComponentWrapper ref={forwardedRef} onDragOver={onDragOver} onDrop={onDrop}>
      {children}
    </CanvasComponentWrapper>
  );
}

type CanvasProps = {
  forwardedRef?: React.RefObject<HTMLCanvasElement>;
  onMouseMove: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  onMouseDown: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  onMouseUp: () => void;
};

function Canvas({
  forwardedRef = React.createRef<HTMLCanvasElement>(),
  onMouseMove,
  onMouseDown,
  onMouseUp,
}: CanvasProps) {
  return (
    <StyledCanvas
      ref={forwardedRef}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />
  );
}

export { CanvasWrapper, Canvas };
