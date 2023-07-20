export const throttle = (func: (...args: any[]) => void, time: number) => {
  let throttle: number | null = null;
  return (...args: any[]) => {
    if (!throttle) {
      throttle = window.setTimeout(() => {
        func(...args);
        throttle = null;
      }, time);
    }
  };
};
