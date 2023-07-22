import { useState } from 'react';
import styled from 'styled-components';
import CloseAlert from '../../../share/CloseAlert';

const CloseButton = styled.button`
  position: absolute;
  width: 70px;
  height: 50px;
  top: 0px;
  right: 0px;
  padding: 10px;
  border: none;
  background-color: rgba(59, 88, 156, 1);
  color: white;
  border-radius: 0px 20px 0px 0px;
  &:hover {
    filter: brightness(0.8);
  }

  &:active {
    filter: brightness(0.6);
  }
`;
const CenteredAlertContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 58%;
  transform: translate(-50%, -50%);
  z-index: 30;
`;
type CloseButtonProps = {
  onClick: () => void;
};
function CloseButtonComponent({ onClick }: CloseButtonProps) {
  const [showCloseAlert, setShowCloseAlert] = useState(false);

  const handleClick = () => {
    setShowCloseAlert(true);
  };

  const closeModal = () => {
    setShowCloseAlert(false);
  };

  return (
    <>
      <CloseButton onClick={handleClick}>X</CloseButton>
      <CenteredAlertContainer>
        {showCloseAlert && <CloseAlert closeModal={closeModal} handleClose={onClick} alertText="계속 하시겠습니까?" alertSubText='(현재 창을 종료하면 초기화됩니다.)' continueButtonText='계속 커스텀하기' closeButtonText='종료하기'/>}
      </CenteredAlertContainer>
    </>
  );
}
export default CloseButtonComponent;
