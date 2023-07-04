import styled from 'styled-components';
import { Link } from 'react-router-dom';
function StoreCard() {

  return <>
  <Card>
    <Link to="/">
        <StoreImg>여기이미지</StoreImg>
    </Link>
    <StoreInfo>
        <StoreName>아자아자</StoreName>
        <StoreAddress>어쩌구</StoreAddress>
    </StoreInfo>
  </Card>
    </>
}

export default StoreCard;

const StoreInfo= styled.div`
padding: 10px 20px;
height: 50px;
display: flex;
justify-content: center;
flex-direction: column;
background-color: aqua;
`
const StoreImg= styled.div`
background-color: #ffffff;
height: 80%;
`
const Card = styled.div`
height: 260px;
width: 220px;
background-color: antiquewhite;
border: 5px solid var( --light-purple);
`
const StoreName = styled.p`
font-size: 12.5px;
font-weight: 600;;
color: var(--dark-gray);
margin-bottom: 7px;
`
const StoreAddress = styled.p`
    font-size: 11px;
    color: var(--light-gray)
`