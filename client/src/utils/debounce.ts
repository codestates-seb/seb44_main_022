import { BASE_ANIMATION_TIME } from '../assets/constantValue/constantValue';

export const debounce = (func: (...args: any[]) => void, time = BASE_ANIMATION_TIME) => {
  let timer: number;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, time);
  };
};
