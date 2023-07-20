import { AiOutlineWarning } from 'react-icons/ai';
import { CloseAlertWrapper, CloseAlertSection, Button, WhiteButton } from './CloseAlert.style';

interface CloseAlertProps {
  closeModal: () => void;
  handleClose: () => void;
}

function CloseAlert({ closeModal, handleClose }: CloseAlertProps) {
  const handleContinueShopping = () => {
    closeModal();
  };
  return (
    <CloseAlertWrapper>
      <CloseAlertSection>
        <AiOutlineWarning style={{ fontSize: '28px', color: '#F15757', marginBottom: '13px' }} />
        <p
          style={{
            color: 'var(--bright-black)',
            fontWeight: '600',
            fontSize: '17px',
            textAlign: 'center',
          }}
        >
          종료 하시겠습니까?
          <br />
        </p>
        <p
          style={{
            color: 'var(--light-gray)',
            fontWeight: '600',
            fontSize: '16px',
            textAlign: 'center',
          }}
        >
          (현재 창을 종료하면 초기화됩니다.)
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button style={{ color: '#FCFDFF' }} onClick={handleContinueShopping}>
            계속 커스텀하기
          </Button>
          <WhiteButton onClick={handleClose}>종료하기</WhiteButton>
        </div>
      </CloseAlertSection>
    </CloseAlertWrapper>
  );
}
export default CloseAlert;
