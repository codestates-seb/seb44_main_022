import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ProductCardProps } from '../../assets/interface/Product.interface';
import { priceFormatter } from '../../pages/mypage/PriceFormatter';
import { StoreMenuInfo, CardListContainer, Cards, StoreTitleInfo } from './storeCard.style';
import { ProductPrice } from './ProductCard.style';

function RecommandProductCard({ data }: ProductCardProps) {
  const navigate = useNavigate();
  const handleProductClick = (storeId: number) => {
    navigate(`/store/${storeId}`);
    console.log('aaa')
  };
  return (
    <>
      <CardListContainer>
        {data.map((product) => (          
          <Cards key={product.productId}>
            <div style={{ height: '100%', width: '100%' }} onClick={() => handleProductClick(product.storeId)}>
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
            </div>
            <StoreTitleInfo>
              <p style={{ fontSize: '16px', marginBottom: '0.4rem', fontFamily:'Yaldevi' }}>
                <Link to={`/store/${product.storeId}`} style={{ color: 'var(--light-black)' }}>
                  {product.productName}
                </Link>
              </p>
              <ProductPrice>{priceFormatter(product.productPrice)}원 </ProductPrice>
            </StoreTitleInfo>
          </Cards>
        ))}
      </CardListContainer>
    </>
  );
}
export default RecommandProductCard;