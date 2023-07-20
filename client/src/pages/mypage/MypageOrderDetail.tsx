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
        <CartListName grow={5} minWidth={5} style={{ justifyContent: 'flex-start', marginRight: '0' }}></CartListName>
        <CartListName grow={5} minWidth={40} style={{ padding: ' 1rem', justifyContent: 'flex-start' }}>
          <img
            src={product.productImage}
            style={{ width: '4rem', height: '4rem', objectFit: 'cover', cursor: 'pointer' }}
            onClick={() => navigate(`/store/${product.storeId}`)}
          />
        </CartListName>
        <CartListName
          grow={80}
          minWidth={200}
          style={{
            fontSize: '14px',
            justifyContent: 'flex-start',
            fontWeight: 'bold',
            paddingLeft: '1.5rem',
            paddingRight: '7rem',
            lineHeight: '1.4',
          }}
        >
          {product.productName}
          <span style={{ marginLeft: '0.3rem', color: 'var(--dark-purple)' }}>(x{product.productCount})</span>
        </CartListName>
        <CartListName grow={5} minWidth={20} style={{ fontWeight: 'bold' }}>
          {priceFormatter(product.productPrice)}원
        </CartListName>
        <CartListName
          grow={5}
          minWidth={130}
          style={{ justifyContent: 'flex-end', fontSize: '16px', paddingRight: '2rem' }}
        ></CartListName>
        <CartListName
          grow={5}
          minWidth={150}
          style={{ justifyContent: 'flex-end', fontSize: '16px', paddingRight: '1.5rem', marginRight: '1.8rem' }}
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