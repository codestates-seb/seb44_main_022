//import styled from 'styled-components';
import { BsArrowDownSquare } from 'react-icons/bs';
import { CartListName } from '../../components/CartItem/CartItem.style'
interface Product {
    cartId: number;
    productId: number;
    productName: string;
    productImagePath: string;
    productPrice: number;
    productCount: number;
  }
  
  interface OrderData {
    orderId: number;
    orderProducts: Product[];
    totalPrice: number;
    orderTimestamp: string;
    deliveryStatus: string;
  }
  
  interface MypageOrderListProps {
    products: OrderData;
  }
function MypageOrderList({ products }: MypageOrderListProps) {
    console.log(products)
  return <div>
    <div style={{ display: 'flex', fontSize: '14px' }}>
      <CartListName grow={5} minWidth={5} style={{ justifyContent: 'flex-start', marginRight: '0'  }}>
        1.
      </CartListName>
      <CartListName grow={5} minWidth={40} style={{ padding: ' 1rem', justifyContent:'flex-start' }}>
        <img
          src={`https://plus.unsplash.com/premium_photo-1688464908902-35c67647df83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=400&q=60`}
          style={{ width: '4rem', height: '4rem', objectFit: 'cover' }}
        />
      </CartListName>
      <CartListName grow={80} minWidth={200} style={{ fontSize: '14px', justifyContent: 'flex-start', fontWeight: 'bold', paddingLeft: "1.5rem", paddingRight:"7rem", lineHeight:'1.4'}}>
        아이템 이름 포함 총 3건
      </CartListName>
      <CartListName grow={5} minWidth={20} style={{ fontWeight: 'bold' }}>
        50000
      </CartListName>
      <CartListName
        grow={5}
        minWidth={130}
        style={{ justifyContent: 'flex-end', fontSize: '16px', paddingRight: '2rem' }}
      >
        2022.01.02
      </CartListName>
      <CartListName
        grow={5}
        minWidth={150}
        style={{ justifyContent: 'flex-end', fontSize: '16px', paddingRight: '2.5rem', fontWeight: 'bold'  }}
      >
        배송완료 <BsArrowDownSquare style={{marginLeft:"10px", cursor:"pointer", color:"var(--dark-purple)"}}/>
      </CartListName>
      
    </div>
  </div>;
}
export default MypageOrderList;
