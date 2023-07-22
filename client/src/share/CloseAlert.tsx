import { AiOutlineWarning } from 'react-icons/ai';
import { CloseAlertWrapper, CloseAlertSection, Button, WhiteButton } from './CloseAlert.style';
interface CloseAlertProps {
  closeModal: () => void;
  handleClose?: () => void;
  alertText: string; 
  alertSubText?:string;
  continueButtonText: string; 
  closeButtonText: string; 
  positionAbsolute?: boolean; 
}

function CloseAlert({  
  closeModal,
  handleClose,
  alertText,
  continueButtonText,
  alertSubText,
  closeButtonText,
  positionAbsolute }: CloseAlertProps) {
  const handleContinueShopping = () => {
    closeModal();
  };
  return (
    <CloseAlertWrapper positionAbsolute={positionAbsolute}>
      <CloseAlertSection positionAbsolute={positionAbsolute}>
        <AiOutlineWarning style={{ fontSize: '28px', color: '#F15757', marginBottom: '13px' }} />
        <p
          style={{
            color: 'var(--bright-black)',
            fontWeight: '600',
            fontSize: '17px',
            textAlign: 'center',
          }}
        >
          {alertText}
          <br />
        </p>
        <p
          style={{
            color: 'var(--light-gray)',
            fontWeight: '600',
            fontSize: '16px',
            textAlign: 'center',
            margin: '3px'
          }}
        >
          {alertSubText}          
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button style={{ color: '#FCFDFF' }} onClick={handleContinueShopping}>
            {continueButtonText}
          </Button>
          <WhiteButton onClick={handleClose}>
          {closeButtonText}</WhiteButton>
        </div>
      </CloseAlertSection>
    </CloseAlertWrapper>
  );
}
export default CloseAlert;
