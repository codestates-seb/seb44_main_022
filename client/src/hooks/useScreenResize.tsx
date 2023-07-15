import { useEffect } from 'react';

const useScreenResize = (handleResize: () => void) => {
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};

export default useScreenResize;
