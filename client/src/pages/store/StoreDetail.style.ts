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
margin-top: 14rem;
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 5rem; 
@media (max-width: 820px) {
    width: 600px;
    margin-bottom: 3rem;
    }
`


export const DetailWrapper = styled.section`
margin-left: 8rem;
@media (max-width: 820px) {
    margin-left: 3rem;
    }
`


export const StoreDetailSection = styled.section`
margin-bottom: 4rem;
display: flex;
flex-direction: column;
align-items: center;
    &::after {
    content:"";
    display: block;
    background-color: var(--light-gray);
    height: 1.4px;
    width: 70%;
    margin-top: 20px;
  }
  @media (max-width: 820px) {
    margin-bottom: 3rem;
    }
 
`

export const DetailInfo = styled.p`
    color: var(--bright-black);
    font-weight: 400;
    font-size: 13px;
    margin-top: 10px;
    margin-bottom: 20px;
`

export const DetailTitle = styled.span`
    color: var(--light-gray);
    font-size: 13px;
    margin-right: 5px;
    font-weight: 600;
`