import styled from 'styled-components';
import React from 'react';
import pencil from '../../assets/images/img_modal/pencil.png';

const ButtonStyled = styled.button`
  position: relative;
  z-index: 20;
  width: 30px;
  height: 30px;
  margin-left: 20px;
  border-radius: 50%;
  border: none;
  cursor: grab;

  background-image: url(${pencil});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.1);
    transform: scale(0);
    transition: transform 0.2s ease-in-out;
  }

  &:hover::before {
    transform: scale(1);
  }

  &:active {
    filter: brightness(1.2);
  }
`;

interface DrawButtonProps {
  onClick: () => void;
}

const DrawButton: React.FC<DrawButtonProps> = ({ onClick }) => {
  return <ButtonStyled onClick={onClick}></ButtonStyled>;
};

export default DrawButton;
