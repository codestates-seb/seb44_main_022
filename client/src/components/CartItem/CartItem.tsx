import tempImg from '../../assets/images/cart_img.png';
import CheckBox from '../CheckBox';
import CountButton from '../CountButton.style.ts/CountButton';
import { useState } from 'react';
import { CartItemProps } from '../../assets/interface/Cart.interface';
import { CartListName } from './CartItem.style';

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
  {
    id: 6,
    img: tempImg,
    title: '커스텀 도넛',
    count: 7,
    price: 6000,
  },
  {
    id: 7,
    img: tempImg,
    title: '커스텀 도넛',
    count: 7,
    price: 6000,
  },
];

function CartItem({ items, idx, initialChecked, setTotalPrice }: CartItemProps) {
  const [priceCnt, setPriceCnt] = useState<number>(items.count);

  return (
    <div style={{ display: 'flex', fontSize: '14px' }}>
      <CartListName grow={5} minWidth={45} style={{ justifyContent: 'flex-start' }}>
        {idx + 1}.
      </CartListName>
      <CartListName grow={5} minWidth={40} style={{ padding: ' 0.5rem', alignItems: 'center' }}>
        <img src={items.img} style={{ width: '3rem', height: '3rem', objectFit: 'cover' }} />
      </CartListName>
      <CartListName grow={75} style={{ justifyContent: 'flex-start', fontWeight: 'bold' }}>
        {items.title}
      </CartListName>
      <CartListName
        grow={10}
        minWidth={100}
        style={{ justifyContent: 'space-between', maxWidth: '100px' }}
      >
        <CountButton count={priceCnt} setCount={setPriceCnt} setTotalPrice={setTotalPrice} />
      </CartListName>
      <CartListName grow={15} minWidth={110} style={{ fontWeight: 'bold' }}>
        {items.price.toLocaleString()}
      </CartListName>
      <CartListName
        grow={5}
        minWidth={40}
        style={{ justifyContent: 'flex-start', fontSize: '18px', padding: '0.5rem' }}
      >
        <CheckBox id={items.id} initialChecked={initialChecked} />
      </CartListName>
    </div>
  );
}

export default CartItem;
