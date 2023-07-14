import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import modal_cake from '../../../assets/images/img_modal/modal_cake.png';
import CloseButton from './CloseButton';
import CartButton from './CartButton';
import Popup from './Popup';

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

type ModalButtonsProps = {
  onRequestClose: () => void;
  onSaveAsImage: () => void;
};

const ModalButtons = ({ onSaveAsImage, onRequestClose }: ModalButtonsProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const handleImageClick = () => {
    setShowPopup((prevState) => !prevState);
  };

  return (
    <>
      <CloseButton onClick={onRequestClose} />
      <ImageBox ref={popupRef}>
        <Image src={modal_cake} alt="Cart" onClick={handleImageClick} />
      </ImageBox>
      <CartButton onSaveAsImage={saveAsImage} />
      {showPopup && <Popup />}
    </>
  );
};

export default ModalButtons;
