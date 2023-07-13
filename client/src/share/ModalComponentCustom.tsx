import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import CustomSidebar from '../components/Custom/CustomContent/CustomSidebar';
import CustomContent from '../components/Custom/CustomContent/CustomContent';
import ModalButtons from '../components/Custom/CustomButton/ModalButtons';
type ModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
  children: React.ReactNode;
  overlay?: boolean;
};

const Title = styled.h3`
  font-family: 'Just Another Hand', cursive;
  margin-bottom: 20px;
  font-size: 40px;
  align-self: flex-end;
  position: absolute;
  right: 40%;
  top: 20px;
  color: var(--light-black);
  z-index: 4;
`;

const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 77%;
  min-width: 77%;
  box-shadow: 0px 8px 24px rgba(49, 70, 86, 0.12);
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 10;
  border-radius: 20px;
  overflow: hidden;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9;
`;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CustomContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2), 0px 25px 20px rgba(0, 0, 0, 0.35);
  border: 0.5px solid rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
`;

const ModalComponent: React.FC<ModalProps> = ({ isOpen, onRequestClose, contentLabel }) => {
  const [selectedImage] = useState<string>('');

  return (
    <ModalContainer>
      {isOpen && <Overlay />}
      <StyledModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel={contentLabel}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        overlayClassName="overlay"
      >
        <CustomContainer>
          <Title>BUYTE</Title>
          <CustomSidebar />
          <CustomContent selectedImageProp={selectedImage} />
        </CustomContainer>
        <ModalButtons onRequestClose={onRequestClose} />
      </StyledModal>
    </ModalContainer>
  );
};

export default ModalComponent;
