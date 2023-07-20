import styled from 'styled-components';

export const CanvasComponentWrapper = styled.div`
  background-color: transparent;
  position: relative;
  width: 100%;
  height: 100%;
  margin-bottom: 0;
  z-index: 10;

  &:first-child {
    top: 0;
  }

  &:last-child {
    bottom: 0;
  }
`;
