import { CartItemTabProps } from '../../assets/interface/Cart.interface';
import { CartListName } from '../../components/CartItem/CartItem.style';

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
        style={{ justifyContent: 'flex-start', paddingLeft: '2rem' }}
      >
        No.
      </CartListName>
      <CartListName grow={70} minWidth={300} style={{ fontWeight: 'bold'}}>
        주문정보
      </CartListName>
      <CartListName grow={5} minWidth={5} style={{ fontWeight: 'bold', justifyContent: 'flex-end', }}>
        총액
      </CartListName>
      <CartListName grow={5} minWidth={5} style={{ justifyContent: 'flex-end',fontWeight: 'bold' }}>
        주문날짜
      </CartListName>
      <CartListName
        grow={5}
        minWidth={5}
        style={{ justifyContent: 'flex-end', fontSize: '18px', paddingRight: '2em', fontWeight:'bold' }}
      >
        배송상태
      </CartListName>
    </div>
  );
}

export default CartItemTab;