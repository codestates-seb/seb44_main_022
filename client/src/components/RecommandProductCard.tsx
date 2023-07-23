import { Link } from 'react-router-dom';
import { ProductCardProps } from '../assets/interface/Product.interface';
import { priceFormatter } from '../pages/mypage/PriceFormatter';
import { StoreMenuInfo, CardListContainer, Cards, StoreTitleInfo } from './storeCard.style';
function StoreCard({ data }: ProductCardProps) {
  return (
    <>
      <CardListContainer>
        {data.map((product) => (          
          <Cards key={product.productId}>
            <Link style={{ height: '100%', width: '100%' }} to={`/store/${product.storeId}`}>
              <div style={{ position: 'relative', height: '100%', width: '100%' }}>
                <img
                  src={product.productImage}
                  style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
                <StoreMenuInfo />
              </div>
            </Link>
            <StoreTitleInfo>
              <p style={{ fontSize: '16px', marginBottom: '0.4rem', fontFamily:'Yaldevi' }}>
                <Link to={`/store/${product.storeId}`} style={{ color: 'var(--light-black)' }}>
                  {product.productName}
                </Link>
              </p>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--light-gray)',
                  marginRight: '0.3rem',
                  lineHeight: '1.3',
                  fontFamily:'Yaldevi'
                }}
              >
                {priceFormatter(product.productPrice)}원                
              </p>
            </StoreTitleInfo>
          </Cards>
        ))}
      </CardListContainer>
    </>
  );
}
export default StoreCard;
