import styled from 'styled-components';
import { FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface Store {
    id: number;
    store_title: string;
    store_location: string;
    store_image_url: string;
  }
  
  interface StoreCardProps {
    data: Store[];
  }

function StoreCard({data}: StoreCardProps) {
  return (
    <>
      <CardListContainer>
            {data.map((store) => (
              <Cards key={store.id}>
                <Link style={{ height: '100%', width: '100%' }} to="/">
                  <div style={{ position: 'relative', height: '100%', width: '100%' }}>
                    <img
                      src={store.store_image_url}
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
                    <Link to="/" style={{color: 'var(--light-black)'}}>{store.store_title}</Link>
                  </p>
                  <p style={{ fontSize: '11px', color: 'var(--light-gray)', marginRight:'0.3rem'}}>
                    <FiMapPin style={{ marginRight: '0.1rem', alignItems: 'center' }} />
                    {store.store_location}
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
`;

const StoreTitleInfo = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  padding: 15px 0;
  font-weight: 800;
  text-align: center;
`;