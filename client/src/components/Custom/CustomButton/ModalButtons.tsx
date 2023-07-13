import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import modal_cake from '../../../assets/images/img_modal/modal_cake.png';
import ExampleImage from '../../../assets/images/img_modal/Example.png';
import CloseButton from './CloseButton';
import CartButton from './CartButton';

const ImageBox = styled.div`
  position: absolute;
  background-color: #fab65d;
  width: 155px;
  height: 75px;
  bottom: 0px;
  right: 115px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px 0px 0px 0px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const PopupImage = styled.img`
  width: 300px;
  height: auto;
`;

type ModalButtonsProps = {
  onRequestClose: () => void;
};

const ModalButtons: React.FC<ModalButtonsProps> = ({ onRequestClose }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleImageClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      <CloseButton onClick={onRequestClose} />
      <ImageBox>
        <Image src={modal_cake} alt="Cart" onClick={handleImageClick} />
      </ImageBox>
      <CartButton onRequestClose={onRequestClose} />
      {showPopup && (
        <PopupContainer>
          <PopupImage src={ExampleImage} alt="Example" />
          <button onClick={handlePopupClose}>Close</button>
        </PopupContainer>
      )}
    </>
  );
};

export default ModalButtons;
