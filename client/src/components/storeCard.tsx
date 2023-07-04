import styled from 'styled-components';
import { FiMapPin } from 'react-icons/fi';
// import { Link } from 'react-router-dom';
import dummy from '../assets/dummyDatas/StoreDummy.json'

function StoreCard() {
  return <>
  <CardListContainer>
    {dummy.map((store)=>(
            <Cards key={store.id}>
                <div style={{position: 'relative'}}>
                    <img src={store.store_image_url} style={{width: '100%'}} />
                    <StoreMenuInfo>
                        <p style={{fontSize:'16px', fontWeight: '500', color: '#fff'}}>
                            추천 메뉴: {store.recommand_menu}</p>
                        <p style={{fontSize:'16px', fontWeight: '500', color: '#fff'}}>
                            커스텀 메뉴: {store.custom_menu}</p>
                    </StoreMenuInfo>
                </div>
                <StoreTitleInfo>
                    <p style={{fontSize:'15px',  marginBottom: '0.3rem', color: 'var(--light-black)'}}>{store.store_title}</p>
                    <p style={{fontSize:'13px', color: 'var(--light-gray)'}}>
                        <FiMapPin style={{marginRight: '0.1rem'}}/>
                        {store.store_location}</p>
                </StoreTitleInfo>                
            </Cards>
        
    ))}
  </CardListContainer>
    </>
}
export default StoreCard;

const StoreTitleInfo = styled.div`
 width: 100%;
 background-color:#fff;
 padding: '20px 0'; 
 font-weight:800;
 `

const StoreMenuInfo = styled.div`
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    visibility: hidden;
    cursor: pointer;
    `
const CardListContainer = styled.ul`
   display: flex; 
   flex-wrap: wrap;
   justify-content:space-between;
   background-color:red;
`
const Cards= styled.li`
    width: 30%;
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: #d8b430;
    margin-bottom: 3rem;
    border: 5px solid var( --light-purple);
    img:hover + ${StoreMenuInfo} {
        visibility: visible;
        cursor: pointer;
    }
    div {
        width: 80px
}`