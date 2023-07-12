import { useEffect, useState } from 'react';
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
        />
      </UserInputWrapper>

      <ErrorBox animate={!dataValid && state.length > 0} isChanged={isChanged}>
        {vaildMessage}
      </ErrorBox>
    </>
  );
}

export default UserInput;
