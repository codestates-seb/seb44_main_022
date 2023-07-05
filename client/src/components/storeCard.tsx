import styled from 'styled-components';
import { FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import dummy from '../assets/dummyDatas/StoreDummy.json';

function StoreCard() {
  return (
    <>
      <CardListContainer>
            {dummy.map((store) => (
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
                  <p style={{ fontSize: '11px', color: 'var(--light-gray)', display: 'flex' }}>
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
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  grid-gap: 5rem;
  justify-content: center;
  grid-row-gap: 4rem;
`;

const Cards = styled.li`
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 5px solid var(--light-purple);
  min-width: 230px;
  height: 330px;
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
  padding-left: 20px;
`;