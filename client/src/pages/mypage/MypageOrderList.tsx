import styled from 'styled-components';
import { useState } from 'react';
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
    console.log(products);
    const [isOpened, setIsOpened] = useState(false);
    const handleArrowClick = () => {
        setIsOpened(!isOpened);
      };
  return <div>
    <div style={{ display: 'flex', fontSize: '14px' }}>
      <CartListName grow={5} minWidth={5} style={{ justifyContent: 'flex-start', marginRight: '0'  }}>
         {products.orderId}.
      </CartListName>
      <CartListName grow={5} minWidth={40} style={{ padding: ' 1rem', justifyContent:'flex-start' }}>
        <img
          src={`https://plus.unsplash.com/premium_photo-1688464908902-35c67647df83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=400&q=60`}
          style={{ width: '4rem', height: '4rem', objectFit: 'cover' }}
        />
      </CartListName>
      <CartListName grow={80} minWidth={200} style={{ fontSize: '14px', justifyContent: 'flex-start', fontWeight: 'bold', paddingLeft: "1.5rem", paddingRight:"7rem", lineHeight:'1.4'}}>
        {products.orderProducts[0].productName} 포함 총 {products.orderProducts.length}건
      </CartListName>
      <CartListName grow={5} minWidth={20} style={{ fontWeight: 'bold' }}>
        {products.totalPrice}원
      </CartListName>
      <CartListName
        grow={5}
        minWidth={130}
        style={{ justifyContent: 'flex-end', fontSize: '16px', paddingRight: '2rem' }}
      >
       {products.orderTimestamp}
      </CartListName>
      <CartListName
        grow={5}
        minWidth={150}
        style={{ justifyContent: 'flex-end', fontSize: '16px', paddingRight: '2.5rem', fontWeight: 'bold'  }}
      >
        배송완료 <BsArrowDownSquare onClick={handleArrowClick} style={{
              fontSize:'20px',
              marginLeft: '10px',
              cursor: 'pointer',
              color: 'var(--dark-purple)',
              transform: isOpened ? 'scaleY(-1)' : 'scaleY(1)',
              transition: 'transform 0.3s ease',
            }}/>
      </CartListName>      
    </div>
    <CartListDetail>
        <div style={{ display: 'flex', fontSize: '14px' }}>
          <CartListName grow={5} minWidth={5} style={{ justifyContent: 'flex-start', marginRight: '0'  }}>
          </CartListName>
          <CartListName grow={5} minWidth={40} style={{ padding: ' 1rem', justifyContent:'flex-start' }}>
            <img
              src={`https://images.unsplash.com/photo-1689381601351-77f3755cf46c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80`}
              style={{ width: '4rem', height: '4rem', objectFit: 'cover' }}
            />
          </CartListName>
          <CartListName grow={80} minWidth={200} style={{ fontSize: '14px', justifyContent: 'flex-start', fontWeight: 'bold', paddingLeft: "1.5rem", paddingRight:"7rem", lineHeight:'1.4'}}>
            {products.orderProducts[0].productName}
          </CartListName>
          <CartListName grow={5} minWidth={20} style={{ fontWeight: 'bold' }}>
            {products.orderProducts[0].productPrice}원
          </CartListName>
          <CartListName
            grow={5}
            minWidth={130}
            style={{ justifyContent: 'flex-end', fontSize: '16px', paddingRight: '2rem' }}
          >
          </CartListName>
          <CartListName
            grow={5}
            minWidth={150}
            style={{ justifyContent: 'flex-end', fontSize: '16px', paddingRight: '2.5rem', fontWeight: 'bold'  }}
          />
        </div>
    </CartListDetail>
    <CartListDetail>
        <div style={{ display: 'flex', fontSize: '14px' }}>
          <CartListName grow={5} minWidth={5} style={{ justifyContent: 'flex-start', marginRight: '0'  }}>
          </CartListName>
          <CartListName grow={5} minWidth={40} style={{ padding: ' 1rem', justifyContent:'flex-start' }}>
            <img
              src={`https://images.unsplash.com/photo-1689381601351-77f3755cf46c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80`}
              style={{ width: '4rem', height: '4rem', objectFit: 'cover' }}
            />
          </CartListName>
          <CartListName grow={80} minWidth={200} style={{ fontSize: '14px', justifyContent: 'flex-start', fontWeight: 'bold', paddingLeft: "1.5rem", paddingRight:"7rem", lineHeight:'1.4'}}>
          {products.orderProducts[1].productName}
          </CartListName>
          <CartListName grow={5} minWidth={20} style={{ fontWeight: 'bold' }}>
          {products.orderProducts[1].productPrice}원
          </CartListName>
          <CartListName
            grow={5}
            minWidth={130}
            style={{ justifyContent: 'flex-end', fontSize: '16px', paddingRight: '2rem' }}
          >
          </CartListName>
          <CartListName
            grow={5}
            minWidth={150}
            style={{ justifyContent: 'flex-end', fontSize: '16px', paddingRight: '2.5rem', fontWeight: 'bold'  }}
          />
        </div>
    </CartListDetail>
  </div>;
}
export default MypageOrderList;

const CartListDetail = styled.section`
 width: 100%;
 background-color: var(--gray);
`