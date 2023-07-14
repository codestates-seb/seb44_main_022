import styled from 'styled-components';
import modal_cart from '../../../assets/images/img_modal/modal_cart.png';
import { handleSaveAsImage } from '../CustomContent/CustomContent';
import { CartButtonContainer } from './CartButtonContainer';

const CartImage = styled.img`
  width: 30px;
  height: 30px;
  margin-bottom: 8px;
`;

const CartButtonText = styled.span`
  color: var(--white);
  font-size: 12px;
`;

function CartButtonComponent() {
  return (
    <CartButtonContainer>
      <CartImage src={modal_cart} alt="Cart" onClick={handleSaveAsImage} />
      <CartButtonText>장바구니 담기</CartButtonText>
    </CartButtonContainer>
  );
}

export default CartButtonComponent;
