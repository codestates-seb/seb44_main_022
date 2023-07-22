import styled from 'styled-components';

export const StoreProductSection = styled.section`
display: flex;
flex-direction: column;
align-items: center;
`
export const ProductListTitle = styled.h4`
color: var(--dark-gold);
font-weight: 700;
font-size: 20px;
`
export const StoreDetails = styled.section`
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 5rem; 
position: relative;
margin-top: 10rem;
@media (max-width: 1200px) {
    margin: 8rem 3rem 5rem 3rem;
    }
@media (max-width: 820px) {
    width: 600px;
    margin: 7rem 3rem 3rem 3rem;
    }
`
export const BackButton = styled.button`
width: 50px;
height: 50px;
border-radius: 50%;
color: var(--dark-gray);
border: 1px solid var(--dark-gray);
position: absolute;
left: 3rem;
top: 8rem;
:active {
   background-color: var(--gray);
}
@media (max-width: 1200px) {
    width: 35px;
    height: 35px;
    left: -2rem;
    top: 6rem;
    }
@media (max-width: 820px) {
    width: 30px;
    height: 30px;
    left: -2rem;
    top: 6rem;
    }
`


export const DetailWrapper = styled.section`
margin-left: 8rem;
h3{
    font-weight: 500;
    font-size: 30px;
    color: var(--bright-black);
    margin-bottom: 2rem;
    font-family: 'BMJUA';
}
@media (max-width: 820px) {
    margin-left: 3rem;
    h3{font-size: 25px;}
    }
`


export const StoreDetailSection = styled.section`
margin-bottom: 4rem;
display: flex;
flex-direction: column;
align-items: center;
width: 70%;
    &::after {
    content:"";
    display: block;
    background-color: var(--light-gray);
    height: 1.4px;
    width: 100%;
    margin-top: 20px;
  }
  @media (max-width: 820px) {
    margin-bottom: 3rem;
    }
 
`

export const DetailTitle = styled.span`
    color: var(--light-gray);
    font-size: 16px;
    margin-right: 5px;
    font-weight: 600;
`

export const DetailInfo = styled.p`
    color: var(--bright-black);
    font-weight: 400;
    font-size: 16px;
    margin-top: 10px;
    margin-bottom: 20px;
    line-height: 1.5;
`

