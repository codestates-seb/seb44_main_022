import styled from 'styled-components';
import { FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import dummy from '../assets/dummyDatas/StoreDummy.json'

function StoreCard() {
  return <>
  <CardListContainer>
    {dummy.map((store)=>(
            <Cards key={store.id}>
                <Link to="/">
                    <div style={{position: 'relative', height: '40vh', width:'20vw'}}>
                        {/* <img src={store.store_image_url}  /> */}
                        <div style={{background:`url(${store.store_image_url})`, height: '100%', width: '100%' }}></div>
                        <StoreMenuInfo>
                            <p style={{fontSize:'16px', fontWeight: '500', color: 'var(--purple)'}}>
                                추천 메뉴: {store.recommand_menu}</p>
                            <p style={{fontSize:'16px', fontWeight: '500', color: '#fff'}}>
                                커스텀 메뉴: {store.custom_menu}</p>
                        </StoreMenuInfo>
                    </div>
                </Link>
                <StoreTitleInfo>
                    <p style={{fontSize:'14px',  marginBottom: '0.4rem', color: 'var(--light-gray)'}}>
                        <Link to="/">
                            {store.store_title}</Link></p>
                    <p style={{fontSize:'12px', color: 'var(--light-gray)', display: 'flex'}}>
                        <FiMapPin style={{marginRight: '0.1rem', alignItems:'center'}}/>
                        {store.store_location}</p>
                </StoreTitleInfo>                
            </Cards>        
    ))}
  </CardListContainer>
    </>
}
export default StoreCard;



const StoreMenuInfo = styled.div`
    background-color: rgba(255, 255, 255, 0.3);
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
    transition: all 0.7s;
    `
const CardListContainer = styled.ul`
   display: flex; 
   flex-wrap: wrap;
   justify-content:space-between;
`
const Cards= styled.li`
    align-items: center;
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: #ffd439;
    margin-bottom: 3rem;
    border: 5px solid var( --light-purple);
    max-width: calc(30% - 3rem);
    min-width: 220px;
    height: 100%; 
    img {
        width: 100%;
    }
    &:hover {${StoreMenuInfo} {
        opacity: 1;
        cursor: pointer;}
    }
    `

const StoreTitleInfo = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  padding: 15px 0; 
  font-weight: 800;
  padding-left: 20px;
 `