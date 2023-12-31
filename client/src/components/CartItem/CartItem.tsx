import { useState } from 'react';
import CountButton from '../CountButton/CountButton';
import { CartItemProps } from '../../assets/interface/Cart.interface';
import CheckBox from './CheckBox';
import { CartImage, CartListName } from './CartItem.style';

function CartItem({ items, idx, initialChecked, setTotalPrice }: CartItemProps) {
  const [priceCnt, setPriceCnt] = useState<number>(items.productCount);

  return (
    <div style={{ display: 'flex', fontSize: '14px' }}>
      <CartListName grow={5} minWidth={45} style={{ justifyContent: 'flex-start' }}>
        {idx + 1}.
      </CartListName>
      <CartListName grow={5} minWidth={40} style={{ padding: ' 0.5rem', alignItems: 'center' }}>
        <CartImage
          src={items.productImagePath}
          onClick={() => window.open(items.productImagePath)}
        />
      </CartListName>
      <CartListName grow={75} minWidth={150} style={{ justifyContent: 'flex-start' }}>
        {items.productName}
      </CartListName>
      <CartListName
        grow={10}
        minWidth={100}
        style={{
          justifyContent: `${setTotalPrice !== undefined ? 'space-between' : 'center'}`,
          maxWidth: '100px',
        }}
      >
        {setTotalPrice !== undefined ? (
          <CountButton
            id={items.cartId}
            count={priceCnt}
            setCount={setPriceCnt}
            setTotalPrice={setTotalPrice}
          />
        ) : (
          <div>{items.productCount}</div>
        )}
      </CartListName>
      <CartListName grow={15} minWidth={110}>
        {items.productPrice.toLocaleString()}
      </CartListName>
      <CartListName
        grow={5}
        minWidth={40}
        style={{ justifyContent: 'flex-start', fontSize: '18px', padding: '0.5rem' }}
      >
        {initialChecked !== undefined && <CheckBox items={items} initialChecked={initialChecked} />}
      </CartListName>
    </div>
  );
}

export default CartItem;
