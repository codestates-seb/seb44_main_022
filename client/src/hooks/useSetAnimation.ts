import { useState } from 'react';

function useSetAnimation() {
  const [animation, setAnimation] = useState(() => {
    if (location.pathname === '/auth') {
      return 'none';
    }
    return 'fadeIn';
  });

  return { animation, setAnimation };
}

export default useSetAnimation;
