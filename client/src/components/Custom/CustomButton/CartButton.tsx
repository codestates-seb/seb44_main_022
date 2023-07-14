import styled from 'styled-components';
import modal_cart from '../../../assets/images/img_modal/modal_cart.png';
import { CartButtonContainer } from './CartButtonContainer';
// import { saveCanvasAsImage } from '../CustomContent/CustomContent';
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

function CartButtonComponent({ onRequestClose }: CartButtonProps) {
  return (
    <CartButtonContainer onClick={onRequestClose}>
      <CartImage src={modal_cart} alt="Cart" />
      <CartButtonText>장바구니 담기</CartButtonText>
    </CartButtonContainer>
  );
}

export default CartButtonComponent;
