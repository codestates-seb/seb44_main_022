import { MdCheckBox } from 'react-icons/md';
import styled, { css } from 'styled-components';
import tempImg from '../assets/images/cart_img.png';

export const CARTLIST = [
  {
    id: 1,
    img: tempImg,
    title: '블루베리 쿠키',
    count: 5,
    price: 1900,
  },
  {
    id: 2,
    img: tempImg,
    title: '레드벨벳 케이크',
    count: 1,
    price: 29900,
  },
  {
    id: 3,
    img: tempImg,
    title: '화이트 초코케이크',
    count: 3,
    price: 2100,
  },
  {
    id: 4,
    img: tempImg,
    title: '블랙 진저 쿠키',
    count: 5,
    price: 2200,
  },
  {
    id: 5,
    img: tempImg,
    title: '커스텀 도넛',
    count: 7,
    price: 6000,
  },
];

interface CartItemProps {
  img: string;
  title: string;
  count: number;
  price: number;
}

function CartItem({ img, title, count, price }: CartItemProps) {
  return (
    <div style={{ display: 'flex', fontSize: '14px' }}>
      <CartListName grow={5} minWidth={60} style={{ justifyContent: 'flex-start' }}>
        <MdCheckBox />
      </CartListName>
      <CartListName grow={5} minWidth={40}>
        <img src={img} style={{ width: '1rem', height: '1rem', objectFit: 'cover' }} />
      </CartListName>
      <CartListName grow={75} style={{ justifyContent: 'flex-start' }}>
        {title}
      </CartListName>
      <CartListName grow={0} minWidth={80}>
        {count}
      </CartListName>
      <CartListName grow={15} minWidth={120}>
        {price}
      </CartListName>
    </div>
  );
}

const CartListName = styled.div<{ grow: number; minWidth?: number }>`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid gray;
  padding: 1rem;
  width: ${({ grow }) =>
    css`
      ${grow}%
    `};

  min-width: ${({ minWidth }) =>
    minWidth
      ? css`
          ${minWidth}px
        `
      : css`120px`};
`;

export default CartItem;
