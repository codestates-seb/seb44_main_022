import React from 'react';
import styled from 'styled-components';
import drag from '../../assets/images/img_modal/drag.png';
const ButtonStyled = styled.button`
  position: relative;
  z-index: 20;
  width: 30px;
  height: 30px;
  margin-left: 20px;
  border-radius: 50%;
  border: none;
  cursor: grab;
  background-image: url(${drag});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  aspect-ratio: 1/1;

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

interface DragButtonProps {
  onToggleDrag: () => void;
}
const DragButton: React.FC<DragButtonProps> = ({ onToggleDrag }) => {
  return <ButtonStyled onClick={onToggleDrag}></ButtonStyled>;
};

export default DragButton;
