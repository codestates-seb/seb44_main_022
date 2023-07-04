import { ComponentType, ReactElement, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

interface InputProps {
  setState: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  placeholderText: string;
  dataValid: boolean;
  icon: ReactElement<ComponentType>;
  vaildMessage: string;
}

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

const UserInputWrapper = styled.div`
  position: relative;
`;

const InputBox = styled.input<{ valid: boolean }>`
  display: block;
  border-radius: 12px;
  width: 300px;
  border: 1px solid transparent;
  background-color: var(--gray);
  margin: 0.2rem 0;
  padding: 1rem 0 1rem 2.5rem;
  color: var(--dark-gray);
  ::placeholder {
    color: var(--bright-black);
  }
  ${({ valid }) => valid && 'border-color: red'}
`;

const Icons = styled.div`
  position: absolute;
  width: 1.35rem;
  height: 1.35rem;
  display: flex;
  align-items: center;
  top: 50%;
  left: 1.5rem;
  transform: translate(-50%, -50%);
  color: var(--light-gray);
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    height: 0;
  }
  10% {
    height: auto;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
    height: auto;
  }
  70% {
    height: auto;
  }
  100% {
    opacity: 0;
    height: 0;
  }
`;

const ErrorBox = styled.div<{ animate: boolean; isChanged: boolean | null }>`
  color: red;
  margin: 0.25rem 0;
  padding: 0 0.25rem;
  width: 300px;
  word-break: keep-all;
  font-size: 14px;
  display: ${({ isChanged }) => (isChanged === null ? 'none' : 'block')};
  ${({ animate, isChanged }) =>
    isChanged !== null &&
    css`
      animation: ${animate
          ? css`
              ${fadeIn}
            `
          : css`
              ${fadeOut}
            `}
        0.3s forwards;
    `};
`;

export default UserInput;
