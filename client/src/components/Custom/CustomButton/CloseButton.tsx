import React from 'react';
import styled from 'styled-components';

const CloseButton = styled.button`
  position: absolute;
  width: 70px;
  height: 50px;
  top: 0px;
  right: 0px;
  padding: 10px;
  border: none;
  background-color: rgba(20, 46, 56, 0.9);
  color: white;
  border-radius: 0px 20px 0px 0px;
`;

type CloseButtonProps = {
  onClick: () => void;
};

const CloseButtonComponent: React.FC<CloseButtonProps> = ({ onClick }) => {
  return <CloseButton onClick={onClick}>X</CloseButton>;
};

export default CloseButtonComponent;
