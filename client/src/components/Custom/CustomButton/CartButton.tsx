import styled from 'styled-components';
import modal_cart from '../../../assets/images/img_modal/modal_cart.png';
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

type CartButtonProps = {
  onSaveImage: () => Promise<void>;
};

function CartButton({ onSaveImage }: CartButtonProps) {
  return (
    <CartButtonContainer>
      <CartImage src={modal_cart} alt="Cart" onClick={onSaveImage} />
      <CartButtonText>장바구니 담기</CartButtonText>
    </CartButtonContainer>
  );
}

export default CartButton;
