import { ComponentType, ReactElement } from 'react';

export interface ButtonProps {
  title: string;
  types: string;
  icon?: ReactElement<ComponentType>;
  enabled?: boolean;
}
