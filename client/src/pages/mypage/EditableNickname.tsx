import styled from 'styled-components';
import { useState } from 'react';

interface EditableNicknameProps {
    nickname: string;
    onNicknameChange: (newNickname: string) => void;
    onEditModeToggle: () => void;
  }  

  function EditableNickname({ nickname, onNicknameChange, onEditModeToggle }: EditableNicknameProps) {
    const [inputValue, setInputValue] = useState(nickname);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };

    const handleSaveClick = () => {
      if (inputValue.trim() !== '') {
        onNicknameChange(inputValue);
        onEditModeToggle();
      }
    };
    
  return (
    <div>
      <EditInput type="text" value={nickname} onChange={handleInputChange} />
      <EditButton onClick={handleSaveClick}>저장</EditButton>
    </div>
  );
}
export default EditableNickname;

const EditInput = styled.input`
    width: 300px;
    font-size: 18px;
    margin-bottom: 20px;
    padding: 2px 10px;
    border: 1px solid var(--light-gray);
    font-family: inherit;
    color: var(--dark-gray);
  &:focus {
    outline: 1px solid var(--purple);
  }
`

const EditButton = styled.button`
  width: 60px;
  height: 30px;
  background-color: var(--purple);
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  color: var(--black);
  border: none;
  border-radius: 20px;
  :hover {
    transition: 1s ease;
    background-color: var(--blue-purple);
  }
`
