import { FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { StoreCardProps } from '../../assets/interface/Store.interface';
import { StoreMenuInfo, CardListContainer, Cards, StoreTitleInfo } from './StoreCard.style';

function StoreCard({ data }: StoreCardProps) {
  return (
    <>
      <CardListContainer>
        {data.map((store) => (
          <Cards key={store.storeId}>
            <Link style={{ height: '100%', width: '100%' }} to={`/store/${store.storeId}`}>
              <div style={{ position: 'relative', height: '100%', width: '100%' }}>
                <img
                  src={store.storeImage}
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
                <Link to={`/store/${store.storeId}`} style={{ color: 'var(--light-black)' }}>
                  {store.storeName}
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
                <FiMapPin style={{ marginRight: '0.1rem', alignItems: 'center' }} />
                {store.storeAddress}
              </p>
            </StoreTitleInfo>
          </Cards>
        ))}
      </CardListContainer>
    </>
  );
}
export default StoreCard;
