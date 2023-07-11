import styled from 'styled-components';
import React from 'react';

interface RangeInputContainerProps {
  children: React.ReactNode;
}

const ContainerStyled = styled.div`
  background-color: transparent;
  position: absolute;
  width: 100%;
  bottom: 26%;
  right: 14%;
  display: flex;
  justify-content: center;
  z-index: 15;
`;

const RangeInputContainer: React.FC<RangeInputContainerProps> = ({ children }) => {
  return <ContainerStyled>{children}</ContainerStyled>;
};

export default RangeInputContainer;
