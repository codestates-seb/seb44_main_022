//import styled from 'styled-components';
import { CartListName } from '../../components/CartItem/CartItem.style'
function MypageOrderList() {
  return <div>
    <div style={{ display: 'flex', fontSize: '14px' }}>
      <CartListName grow={5} minWidth={5} style={{ justifyContent: 'flex-start' }}>
        1.
      </CartListName>
      <CartListName grow={5} minWidth={40} style={{ padding: ' 0.5rem', alignItems: 'center', justifyContent:'flex-start' }}>
        <img
          src={`https://plus.unsplash.com/premium_photo-1688464908902-35c67647df83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=400&q=60`}
          style={{ width: '4rem', height: '4rem', objectFit: 'cover' }}
        />
      </CartListName>
      <CartListName grow={80} minWidth={100} style={{ fontSize: '15px', justifyContent: 'flex-start', fontWeight: 'bold' }}>
        아이템이름 포함 총 3건
      </CartListName>
      <CartListName grow={5} minWidth={20} style={{ fontWeight: 'bold' }}>
        50000
      </CartListName>
      <CartListName
        grow={5}
        minWidth={80}
        style={{ justifyContent: 'flex-end', fontSize: '16px', padding: '0.5rem' }}
      >
        2022.01.02
      </CartListName>
      <CartListName
        grow={5}
        minWidth={40}
        style={{ justifyContent: 'flex-end', fontSize: '16px', paddingRight: '2rem',fontWeight: 'bold'  }}
      >
        배송완료
      </CartListName>
    </div>
  </div>;
}
export default MypageOrderList;
