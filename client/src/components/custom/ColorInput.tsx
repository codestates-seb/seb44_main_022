import styled from 'styled-components';
import React from 'react';

interface ColorInputProps {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ColorInputStyled = styled.input.attrs({
  type: 'color',
})<ColorInputProps>`
  position: relative;
  z-index: 20;
  height: 25px;
  width: 40px;
  border-radius: 20px;
  margin-left: 30px;

  &::-webkit-color-swatch {
    position: absolute;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 20px;
    padding: 0;
    pointer-events: none;
  }

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: 20px;
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

const ColorInput: React.FC<ColorInputProps> = ({ id, value, onChange }) => {
  return <ColorInputStyled id={id} value={value} onChange={onChange} />;
};
export default ColorInput;
