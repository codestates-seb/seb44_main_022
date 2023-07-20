import { useState } from 'react';

function useAuthAnimation() {
  const [animation, setAnimation] = useState(() => {
    if (location.pathname === '/auth') {
      return 'none';
    }
    return 'fadeIn';
  });

  return { animation, setAnimation };
}

export default useAuthAnimation;
