import React from 'react';
import styled from 'styled-components';
import modal_cart from '../assets/images/img_modal/modal_cart.png';
import modal_cake from '../assets/images/img_modal/modal_cake.png';
const CloseButton = styled.button`
  position: absolute;
  width: 70px;
  height: 50px;
  top: 0px;
  right: 0px;
  padding: 10px;
  border: none;
  background-color: rgba(20, 46, 56, 0.9);
  color: white;
  border-radius: 0px 20px 0px 0px;
`;

const CartButton = styled.button`
  position: absolute;
  width: 115px;
  height: 75px;
  bottom: 0px;
  right: 0px;
  padding: 10px;
  border: none;
  background-color: transparent;
  border: 1px solid var(--light-black);
  border-radius: 0px 0px 20px 0px;
  background-color: rgba(20, 46, 56, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CartImage = styled.img`
  width: 30px;
  height: 30px;
  margin-bottom: 8px;
`;

const CartButtonText = styled.span`
  color: var(--white);
  font-size: 6px;
`;

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
      <CloseButton onClick={onRequestClose}>X</CloseButton>
      <ImageBox>
        <Image src={modal_cake} alt="Cart" />
      </ImageBox>
      <CartButton>
        <CartImage src={modal_cart} alt="Cart" />
        <CartButtonText>장바구니 담기</CartButtonText>
      </CartButton>
    </>
  );
};

export default ModalButtons;
