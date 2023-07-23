import { MdCheckBox } from 'react-icons/md';
import { CartItemTabProps } from '../../assets/interface/Cart.interface';
import { CartListName } from './CartItem.style';

function CartItemTab(path: CartItemTabProps) {
  return (
    <div
      style={{
        display: 'flex',
        fontSize: '18px',
        backgroundColor: 'var(--light-purple)',
      }}
    >
      <CartListName
        grow={5}
        minWidth={45}
        style={{ justifyContent: 'flex-start', paddingLeft: '0.5rem' }}
      >
        No.
      </CartListName>
      <CartListName grow={5} minWidth={40} style={{ padding: '0.5rem' }}></CartListName>
      <CartListName grow={75} minWidth={150}>
        상품정보
      </CartListName>
      <CartListName grow={10} minWidth={100} style={{ width: '100px' }}>
        수량
      </CartListName>
      <CartListName grow={15} minWidth={110}>
        상품금액
      </CartListName>
      <CartListName
        grow={5}
        minWidth={40}
        style={{ justifyContent: 'flex-start', fontSize: '18px', padding: '0.5rem' }}
      >
        {path && <MdCheckBox />}
      </CartListName>
    </div>
  );
}

export default CartItemTab;
