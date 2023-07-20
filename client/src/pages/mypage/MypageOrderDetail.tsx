import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { CartListName } from '../../components/CartItem/CartItem.style';
import { MypageOrderDetailProps } from '../../assets/interface/Mypage.interface'
import { priceFormatter } from './PriceFormatter';
function MypageOrderDetail({ product }: MypageOrderDetailProps) {
  const navigate = useNavigate();
  return (
    <CartListDetail>
      <div style={{ display: 'flex', fontSize: '14px' }}>
        <CartListName style={{justifyContent:'flex-start', marginLeft:'7.5rem', maxWidth:'10rem'}}>
          <img
            src={product.productImage}
            style={{ width: '4rem', height: '4rem', objectFit: 'cover', cursor: 'pointer' }}
            onClick={() => navigate(`/store/${product.storeId}`)}
          />
        </CartListName>
        <CartListName minWidth={190}
          style={{
            fontSize: '14px',
            fontWeight: 'bold',
            lineHeight: '1.4',
            paddingRight:'3rem'
          }}
        >
          {product.productName}
          <span style={{ color: 'var(--dark-purple)' }}>(x{product.productCount})</span>
        </CartListName>
        <CartListName className="hide-under-1600" style={{ fontWeight: 'bold', maxWidth:'310px', justifyContent:'flex-start'}}>
          {priceFormatter(product.productPrice)}원
        </CartListName>
        <CartListName
          style={{ fontSize: '16px', justifyContent:'flex-end', paddingRight:'2rem'}}
        >
            <OrderButton onClick={() => navigate(`/store/${product.storeId}`)}>바로가기</OrderButton>
        </CartListName>
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