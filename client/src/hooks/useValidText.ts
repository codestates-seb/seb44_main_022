import { useEffect } from 'react';
import { REGEX } from '../assets/constantValue/constantValue';

const useValidText = (
  state: string,
  setValidState: React.Dispatch<React.SetStateAction<boolean>>,
  type: string
) => {
  const strCheck = (str: string, type: string) => {
    switch (type) {
      case 'id':
        return REGEX.id.test(str);
      case 'password':
        return REGEX.password.test(str);
      case 'nickname':
        return REGEX.nickname.test(str);
      default:
        alert('unvalid type input: 지정되지 않은 타입입니다.');
        return false;
    }
  };

  useEffect(() => {
    setValidState(strCheck(state, type));
  }, [state]);
};

export default useValidText;
