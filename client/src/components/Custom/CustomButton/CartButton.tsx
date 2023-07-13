import React from 'react';
import styled from 'styled-components';
import modal_cart from '../../../assets/images/img_modal/modal_cart.png';
const CartButtonContainer = styled.button`
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
  font-size: 12px;
`;

type CartButtonProps = {
  onRequestClose: () => void;
};

const CartButtonComponent: React.FC<CartButtonProps> = ({ onRequestClose }) => {
  return (
    <CartButtonContainer onClick={onRequestClose}>
      <CartImage src={modal_cart} alt="Cart" />
      <CartButtonText>장바구니 담기</CartButtonText>
    </CartButtonContainer>
  );
};

export default CartButtonComponent;
