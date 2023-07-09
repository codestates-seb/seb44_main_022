import React from 'react';
import styled from 'styled-components';
import modal_cake from '../../../assets/images/img_modal/modal_cake.png';
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
`;

type ModalButtonsProps = {
  onRequestClose: () => void;
};

const ModalButtons: React.FC<ModalButtonsProps> = ({ onRequestClose }) => {
  return (
    <>
      <CloseButton onClick={onRequestClose} />
      <ImageBox>
        <Image src={modal_cake} alt="Cart" />
      </ImageBox>
      <CartButton onRequestClose={onRequestClose} />
    </>
  );
};

export default ModalButtons;
