import React from 'react';
import { ColorInputStyled } from './ColorInputStyled';

interface ColorInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function ColorInput({ value, onChange }: ColorInputProps) {
  return <ColorInputStyled value={value} onChange={onChange} />;
}

export default ColorInput;
