import { useEffect } from 'react';
import { NavigateFunction } from 'react-router-dom';

const useGoBackRestrict = (navigate: NavigateFunction, path: string) => {
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state) {
        navigate(`${path}`);
      }
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);
};

export default useGoBackRestrict;
