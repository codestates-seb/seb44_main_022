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
      <CartListName
        grow={5}
        minWidth={5}
        style={{ justifyContent: 'flex-start', paddingLeft: '2rem' }}
      >
        No.
      </CartListName>
      <CartListName grow={75} minWidth={300} style={{ fontWeight: 'bold'}}>
        주문정보
      </CartListName>
      <CartListName grow={5} minWidth={100} style={{ fontWeight: 'bold', justifyContent: 'flex-end', }}>
        총액
      </CartListName>
      <CartListName grow={5} minWidth={130} style={{ justifyContent: 'flex-end',fontWeight: 'bold' }}>
        주문날짜
      </CartListName>
      <CartListName
        grow={5}
        minWidth={150}
        style={{ justifyContent: 'flex-end', fontSize: '18px', paddingRight: '3em', fontWeight:'bold' }}
      >
        배송상태
      </CartListName>
    </div>
  );
}

export default MypageOrderTab;