import { useEffect } from 'react';

const useKeydown = (handleKeydown: (e: KeyboardEvent) => void) => {
  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);
};

export default useKeydown;
