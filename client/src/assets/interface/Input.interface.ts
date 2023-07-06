import { ComponentType, ReactElement } from 'react';

export interface InputProps {
  setState: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  placeholderText: string;
  dataValid: boolean;
  icon: ReactElement<ComponentType>;
  vaildMessage: string;
}
