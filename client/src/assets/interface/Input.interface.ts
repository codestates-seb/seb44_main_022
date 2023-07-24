import { ComponentType, ReactElement } from 'react';

export interface InputProps {
  setState: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  placeholderText: string;
  dataValid: boolean;
  icon: ReactElement<ComponentType>;
  vaildMessage: string;
}

export interface OrderInputProps {
  id: string;
  name: string;
  width: string;
  placeholder: string;
  state?: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}
