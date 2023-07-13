import React from 'react';
import { ColorInputStyled } from './ColorInputStyled';

interface ColorInputProps {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function ColorInput({ id, value, onChange }: ColorInputProps) {
  return <ColorInputStyled id={id} value={value} onChange={onChange} />;
}

export default ColorInput;
