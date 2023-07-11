import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiArrowBack} from 'react-icons/bi';
import ProductCard from '../../components/ProductCard/ProductCard';
import {
  StoreProductSection,
  ProductListTitle,
  StoreDetails,
  StoreDetailSection,
  DetailInfo,
  Detail
} from './StoreDetail.style';

interface Product {
  productId: number;
  productImage: string;
  productName: string;
  productType: string;
}

interface Store {
  storeId: number;
  storeName: string;
  storeAddress: string;
  storeIntroduction: string;
  storePhone: string;
  storeImage: string;
  customProductInfoList: Product[];
  standardProductInfoList: Product[];
}

function StoreDetail() {    
const data: Store = 
  {   "storeId": 1, 
  //storeId는 Props로 받아오기
      "storeName": "반짝제과제빵",
      "storeAddress": "서울 송파구 백제고분로45길 3",
      "storeIntroduction": "프리미엄 디저트카페 노티드 송리단길",
      "storePhone": "010-2344-2323",
      "storeImage": "https://images.unsplash.com/photo-1486955535268-e5c3bd81aeb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "customProductInfoList": [
        {
          "productId": 12,
          "productImage": "https://images.unsplash.com/photo-1521624738948-5250b8a7c220?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
          "productName": "케이크",
          "productType": "CUSTOM",
        },
        {
          "productId": 13,
          "productImage": "https://images.unsplash.com/photo-1589431683447-2c0abd8d99e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
          "productName": "쿠키",
          "productType": "CUSTOM",
        },
        {
          "productId": 14,
          "productImage": "https://images.unsplash.com/photo-1533910534207-90f31029a78e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
          "productName": "도넛",
          "productType": "CUSTOM",
        }
      ],
      "standardProductInfoList": [
          {
              "productId": 1,
              "productImage": "https://plus.unsplash.com/premium_photo-1668784193175-b16306c81100?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
              "productName": "옐로우 스마일",
              "productType": "STANDARD",
          },
          {
              "productId": 2,
              "productImage": "https://images.unsplash.com/photo-1506184341422-6cc152ae474b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
              "productName": "쿠키 & 초코파이",
              "productType": "STANDARD",
          },
          {
            "productId": 3,
            "productImage": "https://images.unsplash.com/photo-1562777717-dc6984f65a63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
            "productName": "쿠키 & 초코파이",
            "productType": "STANDARD",
        },
        {
          "productId": 4,
          "productImage": "https://plus.unsplash.com/premium_photo-1675881736302-af0425d8b9c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
          "productName": "쿠키 & 초코파이",
          "productType": "STANDARD",
      },
        {
          "productId": 5,
          "productImage": "https://images.unsplash.com/photo-1629196256546-ff4f3e27f623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
          "productName": "쿠키 & 초코파이",
          "productType": "STANDARD",
       }, 
       {
        "productId": 5,
        "productImage": "https://images.unsplash.com/photo-1629196256546-ff4f3e27f623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        "productName": "쿠키 & 초코파이",
        "productType": "STANDARD",
     }, 
     {
      "productId": 6,
      "productImage": "https://images.unsplash.com/photo-1629196256546-ff4f3e27f623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "productName": "쿠키 & 초코파이",
      "productType": "STANDARD",
   }, 
    {
      "productId": 7,
      "productImage": "https://images.unsplash.com/photo-1629196256546-ff4f3e27f623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "productName": "쿠키 & 초코파이",
      "productType": "STANDARD",
       },   
       {
          "productId": 8,
          "productImage": "https://images.unsplash.com/photo-1629196256546-ff4f3e27f623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
          "productName": "쿠키 & 초코파이",
          "productType": "STANDARD",
      }, 
          {
            "productId": 9,
            "productImage": "https://images.unsplash.com/photo-1629196256546-ff4f3e27f623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
            "productName": "쿠키 & 초코파이",
            "productType": "STANDARD",
          }, 
          {
            "productId": 10,
            "productImage": "https://images.unsplash.com/photo-1629196256546-ff4f3e27f623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
            "productName": "쿠키 & 초코파이",
            "productType": "STANDARD",
          }, 
          {
            "productId": 11,
            "productImage": "https://images.unsplash.com/photo-1629196256546-ff4f3e27f623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
            "productName": "쿠키 & 초코파이",
            "productType": "STANDARD",
          }, 
      ]
  }
  //서버와 통신시 지워야 하는 부분
  

// const [data, setData] = useState<Store | null>(null);
//   useEffect(() => {
//     fetchData();
//   }, []);
//   const fetchData = async () => {  
//       try {
//         const url = `https://buyte.org/store/${storeId}`;
//         //stordId를 storeList측에서 넘겨야 하는듯?
//         const response = await axios.get(url, {
//         headers: {
//           'Content-Type': 'application/json',
//           'ngrok-skip-browser-warning': '69420',
//         },
//   });      
//         const data = response.data;      
//         setData(data[0]);
//       } catch (error) {
//         console.error('Error fetching store data:', error);
//       }
//   };
    
  if (!data) {
    return <div>입점을 준비 중입니다!</div>;
  } 
  return (
    <>
        <StoreDetailSection>     
          <Link to='/store'>
            <BiArrowBack style={{fontSize:'40px', color: 'var(--dark-purple)', marginTop:'11rem', position: 'absolute', left:'11rem', cursor:'pointer'}}/>
          </Link>     
            <StoreDetails>            
                <div style={{backgroundImage:`url('${data.storeImage}')`, width: '280px', height: '280px', borderRadius: '50%', backgroundSize:'cover'}}></div>
                <div style={{marginLeft:'8rem'}}>
                    <h3 style={{fontWeight:'600', fontSize: '18px', color: 'var(--bright-black)', marginBottom: '1rem'}}>{data.storeName}</h3>
                    <Detail>소개</Detail>
                    <DetailInfo>{data.storeIntroduction}</DetailInfo>                   
                    <Detail>주소</Detail><Link to='/*지도보기?*/'><span style={{color: 'var(--light-gray)', fontSize: '13px'}}>[지도보기]</span></Link>
                    <DetailInfo>{data.storeAddress}</DetailInfo>                    
                    <Detail>전화번호</Detail>
                    <span style={{ color: 'var(--bright-black)',fontWeight: '500',fontSize: '13px'}}>{data.storePhone}</span>
                </div>
            </StoreDetails>
        </StoreDetailSection>
        <StoreProductSection>
            <div style={{width: '80%'}}>
                <ProductListTitle>Custom</ProductListTitle>
                <ProductCard data={data.customProductInfoList} storeId={data.storeId} storeName={data.storeName}/>                
                <ProductListTitle>We Made It</ProductListTitle>
                <ProductCard data={data.standardProductInfoList} storeId={data.storeId} storeName={data.storeName}/>
            </div>
        </StoreProductSection>
    </>
  );
}

export default StoreDetail;