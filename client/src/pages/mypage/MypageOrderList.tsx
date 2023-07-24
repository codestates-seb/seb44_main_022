import styled, {keyframes} from 'styled-components';
import { useState } from 'react';
import { BsArrowDownSquare } from 'react-icons/bs';
import {MypageOrderListProps} from '../../assets/interface/Mypage.interface'
import { MyOrderListName} from './MyOrderListName.style';
import MypageOrderDetail from './MypageOrderDetail';
import DateFormatter from './DateFormatter';  
import { priceFormatter } from './PriceFormatter';


function MypageOrderList({ products  }: MypageOrderListProps) {
    const [isOpenedLocal, setIsOpenedLocal] = useState(false); 
    const handleListClick = () => {
        setIsOpenedLocal(!isOpenedLocal);
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
      <MyOrderListName style={{justifyContent:'flex-start', paddingLeft:'2rem', maxWidth:'3%'}}>
         {products.orderCount}.
      </MyOrderListName >
      <MyOrderListName style={{ padding: '1rem', justifyContent:'flex-start', maxWidth:'10%' }}>
        <img
          src={products.orderProductInfos[0].productImage}
          style={{ width: '4rem', height: '4rem', objectFit: 'cover' }}
        />
      </MyOrderListName>
      <MyOrderListName style={{ fontSize: '14px', fontWeight: 'bold', paddingLeft:'2rem', lineHeight:'1.4', minWidth:'28%', maxWidth: '40%' }}>
        {products.orderProductInfos[0].productName} <span style={{minWidth:'60px'}}><span style={{color:"var(--dark-purple)", marginLeft:'5px'}}>포함 총 {products.orderProductInfos.length}</span>건</span>
      </MyOrderListName>
      <MyOrderListName minWidth={1050}  style={{ fontWeight: 'bold', minWidth:'120px', maxWidth: '20%'}}>
        {priceFormatter(products.totalPrice)}원
      </MyOrderListName>
      <MyOrderListName
        style={{ fontSize: '15px', maxWidth: '22%'  }} minWidth={800}
      >
       <DateFormatter timestamp={products.createdAt}></DateFormatter>
      </MyOrderListName>
      <MyOrderListName
        style={{ fontSize: '14px', fontWeight: 'bold' , justifyContent:'flex-end', minWidth:'180px', paddingRight:'2rem' }}
      >
        {getOrderStatusText(products.orderStatus)} <BsArrowDownSquare style={{
              fontSize:'20px',
              marginLeft: '10px',
              cursor: 'pointer',
              color: 'var(--dark-purple)',
              transform: isOpenedLocal ? 'scaleY(-1)' : 'scaleY(1)',
              transition: 'transform 0.5s ease',
            }}/>
      </MyOrderListName>      
    </div>
    {isOpenedLocal && (
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
