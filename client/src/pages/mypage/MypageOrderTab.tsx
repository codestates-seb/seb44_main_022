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
      <CartListName grow={2} style={{ justifyContent:"flex-start", paddingLeft:'3rem'}}
      >
        No.
      </CartListName>
      <CartListName grow={30} minWidth={330} style={{ fontWeight: 'bold', paddingLeft:'4rem'}}>
        주문정보
      </CartListName>
      <CartListName grow={20} style={{ fontWeight: 'bold'}} className="hide-under-1600">
        총액
      </CartListName>
      <CartListName grow={20} style={{ fontWeight: 'bold' }} className="hide-under-1260">
        주문날짜
      </CartListName>
      <CartListName grow={20} minWidth={165}
        style={{ fontWeight:'bold', justifyContent:"flex-end", paddingRight:'2rem' }}
      >
        배송상태
      </CartListName>
    </div>
  );
}

export default MypageOrderTab;