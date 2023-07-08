import styled from 'styled-components';
import React from 'react';
const InputStyled = styled.input.attrs({
  type: 'range',
  min: '1',
  max: '100',
})`
  position: relative;
  z-index: 20;
  -webkit-appearance: none;
  background-color: blue;
  border-radius: 20px;
  height: 8px;
  width: 27%;
  right: 15px;
  margin-top: 10px;
  margin-left: 20px;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 17px;
    height: 17px;
    background-color: var(--dark-purple);
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: yellow;
    cursor: pointer;
  }

  &:focus {
    animation: 1s pulse infinite;
    outline: none;
  }

  &:hover {
    background-color: var(--purple);
    transform: scale(1.15);
  }

  background-color: var(--light-purple);
  top: calc(5px + 50%);

  transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
`;
interface RangeInputProps {
  id: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RangeInput: React.FC<RangeInputProps> = ({ id, value, onChange }) => {
  return <InputStyled type="range" id={id} value={value} onChange={onChange} />;
};
export default RangeInput;
