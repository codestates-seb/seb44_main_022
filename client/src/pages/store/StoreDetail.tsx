import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard'

interface Product {
  productId: number;
  productImage: string;
  productName: string;
  productPrice: number;
  productType: string;
}

interface Store {
  memberId: number;
  storeName: string;
  storeAddress: string;
  storeIntroduction: string;
  storeImage: string;
  productInfoList: Product[];
}


function StoreDetail() {  
const data: Store = 
  {
      "memberId": 1,
      "storeName": "노티드 송리단길",
      "storeAddress": "서울 송파구 백제고분로45길 3",
      "storeIntroduction": "프리미엄 디저트카페 노티드 송리단길",
      "storeImage": "https://images.unsplash.com/photo-1486955535268-e5c3bd81aeb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "productInfoList": [
          {
              "productId": 1,
              "productImage": "https://plus.unsplash.com/premium_photo-1668784193175-b16306c81100?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
              "productName": "옐로우 스마일",
              "productPrice": 22000,
              "productType": "STANDARD"
          },
          {
              "productId": 2,
              "productImage": "https://images.unsplash.com/photo-1506184341422-6cc152ae474b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
              "productName": "쿠키 & 초코파이",
              "productPrice": 5000,
              "productType": "STANDARD"
          },
          {
            "productId": 3,
            "productImage": "https://images.unsplash.com/photo-1562777717-dc6984f65a63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
            "productName": "쿠키 & 초코파이",
            "productPrice": 5000,
            "productType": "STANDARD"
        },
        {
          "productId": 4,
          "productImage": "https://plus.unsplash.com/premium_photo-1675881736302-af0425d8b9c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
          "productName": "쿠키 & 초코파이",
          "productPrice": 5000,
          "productType": "STANDARD"
      },
        {
          "productId": 5,
          "productImage": "https://images.unsplash.com/photo-1629196256546-ff4f3e27f623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
          "productName": "쿠키 & 초코파이",
          "productPrice": 5000,
          "productType": "STANDARD"
       }
      ]
  }
  //서버와 통신시 지워야 하는 부분
  
  

// const [data, setData] = useState<Store | null>(null);
// useEffect(() => {
//   fetchData();
// }, []);

// const fetchData = async () => {  
//     try {
//       const url = `https://db5037e1-137a-4d2b-a379-6d6866a8a0b5.mock.pstmn.io/store/1`;
//       const response = await axios.get(url);      
//       const data = response.data;      
//       setData(data[0]);
//     } catch (error) {
//       console.error('Error fetching store data:', error);
//     }
//   };
    
  if (!data) {
    return <div>Loading...</div>;
  } 
  return (
    <>
        <StoreDetailSection>
            <StoreDetails>
                <div style={{backgroundImage:`url('${data.storeImage}')`, width: '280px', height: '280px', borderRadius: '50%', backgroundSize:'cover'}}></div>
                <div style={{marginLeft:'8rem'}}>
                    <h3 style={{fontWeight:'600', fontSize: '18px', color: 'var(--bright-black)', marginBottom: '1rem'}}>{data.storeName}</h3>
                    <Detail>전화번호</Detail>
                    <DetailInfo>{data.memberId}</DetailInfo>                   
                    <Detail>주소</Detail><Link to='/*지도보기?*/'><span style={{color: 'var(--light-gray)', fontSize: '13px'}}>[지도보기]</span></Link>
                    <DetailInfo>{data.storeAddress}</DetailInfo>                    
                    <Detail>영업시간</Detail>
                    <span style={{ color: 'var(--bright-black)',fontWeight: '500',fontSize: '13px'}}>{data.storeIntroduction}</span>
                </div>
            </StoreDetails>
        </StoreDetailSection>
        <StoreProductSection>
            <div style={{width: '80%'}}>
                <ProductTitle>Custom</ProductTitle>
                <ProductCard data ={data.productInfoList} />
                <ProductTitle>We Made It</ProductTitle>
                {/* <ProductCard data ={data.productInfoList} /> */}
            </div>
        </StoreProductSection>
    </>
  );
}

const StoreProductSection = styled.section`
display: flex;
flex-direction: column;
align-items: center;
`
const ProductTitle = styled.h4`
color: var(--dark-gold);
font-weight: 700;
`
const StoreDetails = styled.section`
margin-top: 14rem;
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 5rem;
`

const StoreDetailSection = styled.section`
margin-bottom: 4rem;
display: flex;
flex-direction: column;
align-items: center;
    &::after {
    content:"";
    display: block;
    background-color: var(--light-gray);
    height: 1.4px;
    width: 80%;
    margin-top: 20px;
  }
`

const DetailInfo = styled.p`
    color: var(--bright-black);
    font-weight: 400;
    font-size: 13px;
    margin-top: 10px;
    margin-bottom: 20px;
`

const Detail = styled.span`
    color: var(--light-gray);
    font-size: 13px;
    margin-right: 5px;
    font-weight: 600;
`

export default StoreDetail;