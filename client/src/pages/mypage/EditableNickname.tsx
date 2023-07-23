import { useState } from 'react';
import { EditableNicknameProps } from '../../assets/interface/Mypage.interface';
import CloseAlert from '../../share/CloseAlert/CloseAlert';
import { Overlay } from '../../share/CloseAlert/CloseAlert.style';
import axiosInstance from '../../api/apis';
import { EditButton, EditInput,DeleteAccountButton } from './EditableNickname.style';
function EditableNickname({ nickname, onNicknameChange, onEditModeToggle }: EditableNicknameProps) {
    const [inputValue, setInputValue] = useState(nickname);
    const [showCloseAlert, setShowCloseAlert] = useState(false);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };
    const handleSaveClick = () => {
      if (inputValue.trim() !== '') {
        onNicknameChange(inputValue);
        onEditModeToggle();
        setShowCloseAlert(true);
      }
    };

    const showModal = () => {
      setShowCloseAlert(true);
    }

    const handleDeleteAccount = async () => {
        try {
          await axiosInstance.delete('/members/withdraw');
          window.localStorage.clear()
          window.location.href = '/'
        } catch (error) {
          console.error('Error deleting Account:', error);
      }
    };

    const closeModal = () => {
      setShowCloseAlert(false);
    };

  return (
    <div>
      <EditInput type="text" value={inputValue} onChange={handleInputChange}/>
      {showCloseAlert && (
        <>
      <Overlay /> 
      <CloseAlert 
      positionAbsolute 
      closeModal={closeModal} 
      alertText="정말 탈퇴 하시겠습니까?" 
      alertSubText='(탈퇴시 복구되지 않습니다.)'
      continueButtonText='안할래요!' 
      closeButtonText='탈퇴하기'
      onDeleteButtonClick={() => handleDeleteAccount()}/>
      </>)
       }
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <EditButton onClick={handleSaveClick} >저장</EditButton>
        <DeleteAccountButton onClick={showModal}>회원탈퇴</DeleteAccountButton>
      </div>
    </div>
  );
}
export default EditableNickname;
