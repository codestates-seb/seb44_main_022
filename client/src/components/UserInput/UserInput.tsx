import { useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { InputProps } from '../../assets/interface/Input.interface';
import { ErrorBox, Icons, InputBox, UserInputWrapper } from './UserInput.style';

function UserInput({
  setState,
  state,
  placeholderText,
  dataValid,
  icon,
  vaildMessage,
}: InputProps) {
  const [isChanged, setIsChanged] = useState<boolean | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(true);

  useEffect(() => {
    if (isChanged === null && state.length > 0) {
      setIsChanged(false);
    } else if (isChanged === false) {
      setIsChanged(true);
    }
  }, [state]);

  return (
    <>
      <UserInputWrapper>
        <Icons>{icon}</Icons>
        <InputBox
          onChange={(e) => setState(e.target.value)}
          value={state}
          placeholder={placeholderText}
          valid={!dataValid && state.length > 0}
          type={placeholderText === 'Password' && showPassword ? 'password' : 'text'}
        />
        {placeholderText === 'Password' &&
          (showPassword ? (
            <Icons style={{ left: '92%' }} onClick={() => setShowPassword(false)}>
              <AiFillEyeInvisible />
            </Icons>
          ) : (
            <Icons style={{ left: '92%' }} onClick={() => setShowPassword(true)}>
              <AiFillEye />
            </Icons>
          ))}
      </UserInputWrapper>

      <ErrorBox animate={!dataValid && state.length > 0} isChanged={isChanged}>
        {vaildMessage}
      </ErrorBox>
    </>
  );
}

export default UserInput;
