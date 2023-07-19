import styled, {keyframes} from 'styled-components';
import { useState } from 'react';
import { BsArrowDownSquare } from 'react-icons/bs';
import { CartListName } from '../../components/CartItem/CartItem.style';
import {MypageOrderListProps} from '../../assets/interface/Mypage.interface'
import MypageOrderDetail from './MypageOrderDetail';
import DateFormatter from './DateFormatter';  

function MypageOrderList({ products }: MypageOrderListProps) {
    const [isOpened, setIsOpened] = useState(false);
    const handleListClick = () => {
        setIsOpened(!isOpened);
      };
      const getOrderStatusText = (status: string) => {
        if (status === 'SUSPENSION') {
          return '주문접수';
        } else if(status ==="CANCELLATION"){
            return '주문취소';
        } else if(status ==="FAILURE"){
            return '주문실패';
        } else if(status==="COMPLETION"){
            return '배송완료';
        }
        return status;
      };
  return <div>
    <div style={{ display: 'flex', fontSize: '14px', cursor:'pointer' }} onClick={handleListClick} >
      <CartListName grow={5} minWidth={5} style={{ justifyContent: 'flex-start', marginRight: '0'  }}>
         {products.orderId}.
      </CartListName>
      <CartListName grow={5} minWidth={40} style={{ padding: ' 1rem', justifyContent:'flex-start' }}>
        <img
          src={products.orderProductInfos[0].productImage}
          style={{ width: '4rem', height: '4rem', objectFit: 'cover' }}
        />
      </CartListName>
      <CartListName grow={80} minWidth={200} style={{ fontSize: '14px', justifyContent: 'flex-start', fontWeight: 'bold', paddingLeft: "1.5rem", paddingRight:"7rem", lineHeight:'1.4'}}>
        {products.orderProductInfos[0].productName} 포함 총 <span style={{color:"var(--dark-purple)", marginLeft:"5px"}}>{products.orderProductInfos.length}</span>건
      </CartListName>
      <CartListName grow={5} minWidth={20} style={{ fontWeight: 'bold' }}>
        {products.totalPrice}원
      </CartListName>
      <CartListName
        grow={5}
        minWidth={130}
        style={{ justifyContent: 'flex-end', fontSize: '15px', paddingRight: '2rem' }}
      >
       <DateFormatter timestamp={products.createdAt}></DateFormatter>
      </CartListName>
      <CartListName
        grow={5}
        minWidth={150}
        style={{ justifyContent: 'flex-end', fontSize: '16px', paddingRight: '2.5rem', fontWeight: 'bold'  }}
      >
        {getOrderStatusText(products.orderStatus)} <BsArrowDownSquare style={{
              fontSize:'20px',
              marginLeft: '10px',
              cursor: 'pointer',
              color: 'var(--dark-purple)',
              transform: isOpened ? 'scaleY(-1)' : 'scaleY(1)',
              transition: 'transform 0.5s ease',
            }}/>
      </CartListName>      
    </div>
    {isOpened && (
        <SlideDown>
          {products.orderProductInfos.map((product, index) => (
            <MypageOrderDetail key={index} product={product} />
          ))}
        </SlideDown>
      )}
  </div>;
}
export default MypageOrderList;

const slideDown = keyframes`
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 1000px;
    opacity: 1;
  }
`;

const SlideDown = styled.div`
  animation: ${slideDown} 1s ease;
`;