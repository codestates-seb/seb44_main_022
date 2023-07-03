import { ComponentType, ReactElement } from 'react';
import styled from 'styled-components';

interface InputProps {
  setState: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  placeholderText: string;
  icon: ReactElement<ComponentType>;
}

function UserInput({ setState, state, placeholderText, icon }: InputProps) {
  return (
    <UserInputWrapper>
      <Icons>{icon}</Icons>
      <InputBox
        onChange={(e) => setState(e.target.value)}
        value={state}
        placeholder={placeholderText}
      />
    </UserInputWrapper>
  );
}

const UserInputWrapper = styled.div`
  position: relative;
`;

const InputBox = styled.input`
  display: block;
  border-radius: 12px;
  width: 300px;
  border: none;
  background-color: var(--gray);
  margin: 0.2rem 0;
  padding: 1rem 0 1rem 2.5rem;
  color: var(--dark-gray);
  ::placeholder {
    color: var(--bright-black);
  }
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

export default UserInput;
