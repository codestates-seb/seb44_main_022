import { useEffect } from 'react';
import { REGEX } from '../assets/constantValue/constantValue';

const useChangeText = (
  state: string,
  setValidState: React.Dispatch<React.SetStateAction<boolean>>,
  type: string
) => {
  const strCheck = (str: string, type: string) => {
    if (type === 'id') {
      return REGEX.id.test(str);
    }
    if (type === 'password') {
      return REGEX.password.test(str);
    }
    return REGEX.nickname.test(str);
  };

  useEffect(() => {
    setValidState(strCheck(state, type));
  }, [state]);
};

export default useChangeText;
