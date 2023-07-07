import styled from 'styled-components';
import { FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface Store {
    storeId: number;
    storeName: string;
    storeAddress: string;
    storeImage: string;
  }
  
  interface StoreCardProps {
    data: Store[];
  }

function StoreCard({data}: StoreCardProps) {
  return (
    <>
      <CardListContainer>
            {data.map((store) => (
              <Cards key={store.storeId}>
                <Link style={{ height: '100%', width: '100%' }} to="/">
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
                    <StoreMenuInfo/>
                  </div>
                </Link>
                <StoreTitleInfo>
                  <p style={{ fontSize: '14px', marginBottom: '0.4rem'  }}>
                    <Link to="/" style={{color: 'var(--light-black)'}}>{store.storeName}</Link>
                  </p>
                  <p style={{ fontSize: '11px', color: 'var(--light-gray)', marginRight:'0.3rem'}}>
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

const StoreMenuInfo = styled.div`  
  position: absolute;
  background-color: rgba(255, 255, 255, 0.3);
  width: 100%;
  height: 100%;
  bottom: 0;
  opacity: 0;
  cursor: pointer;
  transition: all 1s;
`;

const CardListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-gap: 1rem;
  justify-content: center;
  grid-row-gap: 4rem;
`;

const Cards = styled.li`
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 200px;
  height: 320px;
  overflow: hidden;
  &:hover {
    ${StoreMenuInfo} {
      opacity: 1;
      cursor: pointer;
    }
    img {
      transform: scale(1.05); 
      transition: all 1s;
    }
  }
  &:not(:hover) {
    img {
      transform: scale(1);
      transition: all 1s;
    }
  }
`;

const StoreTitleInfo = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: var(--background);
  padding: 15px 0;
  font-weight: 800;
  text-align: center;
`;