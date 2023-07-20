import { CartListName } from '../../components/CartItem/CartItem.style';
function MypageOrderTab() {
  return (
    <div
      style={{
        display: 'flex',
        fontSize: '18px',
        backgroundColor: 'var(--light-purple)',
        width: '100%'
      }}
    >
      <CartListName style={{ justifyContent:"flex-start", paddingLeft:'3rem'}}
      >
        No.
      </CartListName>
      <CartListName style={{ fontWeight: 'bold'}}>
        주문정보
      </CartListName>
      <CartListName style={{ fontWeight: 'bold'}} className="hide-under-1600">
        총액
      </CartListName>
      <CartListName style={{ fontWeight: 'bold'}} className="hide-under-1260">
        주문날짜
      </CartListName>
      <CartListName
        style={{ fontWeight:'bold', justifyContent:"flex-end", paddingRight:'2rem'}}
      >
        배송상태
      </CartListName>
    </div>
  );
}

export default MypageOrderTab;