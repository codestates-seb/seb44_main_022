import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MypageOrderDetailProps } from '../../assets/interface/Mypage.interface'
import { MyOrderListName } from './MyOrderListName.style';
import { priceFormatter } from './PriceFormatter';

function MypageOrderDetail({ product }: MypageOrderDetailProps) {
  const navigate = useNavigate();
  return (
    <CartListDetail>
      <div style={{ display: 'flex', fontSize: '14px' }}>
        <MyOrderListName style={{justifyContent:'flex-start', marginLeft:'3rem', maxWidth:'10%'}}>
          <img
            src={product.productImage}
            style={{ width: '4rem', height: '4rem', objectFit: 'cover', cursor: 'pointer' }}
            onClick={() => navigate(`/store/${product.storeId}`)}
          />
        </MyOrderListName>
        <MyOrderListName
          style={{
            fontSize: '14px',
            fontWeight: 'bold',
            lineHeight: '1.4',
            minWidth:'250px',
            maxWidth: '30%'
          }}
        >
          {product.productName}
          <span style={{ color: 'var(--dark-purple)', marginLeft:"3px" }}>(x{product.productCount})</span>
        </MyOrderListName>
        <MyOrderListName className="hide-under-1600" minWidth={1050}  style={{ fontWeight: 'bold', maxWidth: '15%' }}>
          {priceFormatter(product.productPrice)}원
        </MyOrderListName>
        <MyOrderListName
          style={{ fontSize: '16px', justifyContent:'flex-end', paddingRight:'2rem'}}
        >
            <OrderButton onClick={() => navigate(`/store/${product.storeId}`)}>바로가기</OrderButton>
        </MyOrderListName>
      </div>
    </CartListDetail>
  );
}

export default MypageOrderDetail;

const CartListDetail = styled.section`
  width: 100%;
  background-color: var(--gray);
`;
const OrderButton = styled.button`
    background-color: var(--purple);
    color: var(--white);
    padding: 3px 5px;
    border: 1px solid var(--light-gray);
    border-radius: 3px;
    :hover{
        background-color: var(--dark-purple);
        transition: all 0.2s ease;
    }
`