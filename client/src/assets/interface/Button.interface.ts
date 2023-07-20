import { ComponentType, ReactElement } from 'react';

export interface ButtonProps {
  title: string;
  types: string;
  icon?: ReactElement<ComponentType>;
  enabled?: boolean;
}

export interface CountButtonProps {
  id: number;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}

export interface RectangleButtonProps {
  text: string;
  types: string;
  handleClick: () => void;
}

export interface ChatBoxProps {
  setIsOpenChatting: React.Dispatch<React.SetStateAction<boolean>>;
}
