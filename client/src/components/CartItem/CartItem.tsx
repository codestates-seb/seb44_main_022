import tempImg from '../../assets/images/cart_img.png';
import CheckBox from '../CheckBox';
import CountButton from '../CountButton.style.ts/CountButton';
import { useState } from 'react';
import { CartItemProps } from '../../assets/interface/Cart.interface';
import { CartListName } from './CartItem.style';

export const CARTLIST = [
  {
    cartId: 1,
    productImagePath: tempImg,
    productName: '블루베리 쿠키',
    productCount: 5,
    productPrice: 19005,
  },
  {
    cartId: 2,
    productImagePath: tempImg,
    productName: '블루베리쿠키',
    productCount: 5,
    productPrice: 19040,
  },
  {
    cartId: 3,
    productImagePath: tempImg,
    productName: '블루베리   쿠키',
    productCount: 5,
    productPrice: 19003,
  },
  {
    cartId: 4,
    productImagePath: tempImg,
    productName: '블리 쿠키',
    productCount: 5,
    productPrice: 19002,
  },
  {
    cartId: 5,
    productImagePath: tempImg,
    productName: '리 쿠키',
    productCount: 5,
    productPrice: 19001,
  },
];

function CartItem({ items, idx, initialChecked, setTotalPrice }: CartItemProps) {
  const [priceCnt, setPriceCnt] = useState<number>(items.productCount);

  return (
    <div style={{ display: 'flex', fontSize: '14px' }}>
      <CartListName grow={5} minWidth={45} style={{ justifyContent: 'flex-start' }}>
        {idx + 1}.
      </CartListName>
      <CartListName grow={5} minWidth={40} style={{ padding: ' 0.5rem', alignItems: 'center' }}>
        <img
          src={items.productImagePath}
          style={{ width: '3rem', height: '3rem', objectFit: 'cover' }}
        />
      </CartListName>
      <CartListName grow={75} style={{ justifyContent: 'flex-start', fontWeight: 'bold' }}>
        {items.productName}
      </CartListName>
      <CartListName
        grow={10}
        minWidth={100}
        style={{ justifyContent: 'space-between', maxWidth: '100px' }}
      >
        {setTotalPrice !== undefined ? (
          <CountButton count={priceCnt} setCount={setPriceCnt} setTotalPrice={setTotalPrice} />
        ) : (
          <div>{items.productCount}</div>
        )}
      </CartListName>
      <CartListName grow={15} minWidth={110} style={{ fontWeight: 'bold' }}>
        {items.productPrice.toLocaleString()}
      </CartListName>
      <CartListName
        grow={5}
        minWidth={40}
        style={{ justifyContent: 'flex-start', fontSize: '18px', padding: '0.5rem' }}
      >
        {initialChecked !== undefined ? (
          <CheckBox items={items} initialChecked={initialChecked} />
        ) : (
          <></>
        )}
      </CartListName>
    </div>
  );
}

export default CartItem;
