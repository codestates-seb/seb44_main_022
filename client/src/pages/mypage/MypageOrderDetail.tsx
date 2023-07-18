import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { CartListName } from '../../components/CartItem/CartItem.style';


interface Product {
  cartId: number;
  productId: number;
  productName: string;
  productImagePath: string;
  productPrice: number;
  productCount: number;
  storeId:number;
}

interface MypageOrderDetailProps {
  product: Product;
}

const MypageOrderDetail = ({ product }: MypageOrderDetailProps) => {    
  const navigate = useNavigate();
  return (
    <CartListDetail>
      <div style={{ display: 'flex', fontSize: '14px' }}>
        <CartListName grow={5} minWidth={5} style={{ justifyContent: 'flex-start', marginRight: '0' }}></CartListName>
        <CartListName grow={5} minWidth={40} style={{ padding: ' 1rem', justifyContent: 'flex-start' }}>
          <img
            src={product.productImagePath}
            style={{ width: '4rem', height: '4rem', objectFit: 'cover', cursor:"pointer" }}
            onClick={() => navigate(`/store/${product.storeId}`)}
            //여긴 storeId 받으면 고치기
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
            lineHeight: '1.4'
          }}
        >
          {product.productName} 
          <span style={{marginLeft:"0.3rem", color:"var(--dark-purple)"}}>(x{product.productCount})</span>
        </CartListName>
        <CartListName grow={5} minWidth={20} style={{ fontWeight: 'bold' }}>
          {product.productPrice}원
        </CartListName>
        <CartListName
          grow={5}
          minWidth={130}
          style={{ justifyContent: 'flex-end', fontSize: '16px', paddingRight: '2rem' }}
        ></CartListName>
        <CartListName
          grow={5}
          minWidth={150}
          style={{ justifyContent: 'flex-end', fontSize: '16px', paddingRight: '2.5rem', marginRight:"1.8rem" }}
        >배송완료</CartListName>
      </div>
    </CartListDetail>
  );
};

export default MypageOrderDetail;

const CartListDetail = styled.section`
  width: 100%;
  background-color: var(--gray);
`;