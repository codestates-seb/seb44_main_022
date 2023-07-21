import { useState } from 'react';
import { EditableNicknameProps } from '../../assets/interface/Mypage.interface';
import { EditButton, EditInput } from './EditableNickname.style';

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
      <EditInput type="text" value={inputValue} onChange={handleInputChange}/>
      <EditButton onClick={handleSaveClick}>저장</EditButton>
    </div>
  );
}
export default EditableNickname;
