import styled from 'styled-components';
import { BsFillGearFill } from 'react-icons/bs';
import  { useState, useEffect } from 'react';
import axiosInstance from '../../api/apis';
import MypageOrderTab from './MypageOrderTab';
import MypageOrderList from './MypageOrderList';
import EditableNickname from './EditableNickname';
import Pagination from './Paigination';

//페이지네이션(5개 이상의 리스트가 들어올 시 다음 페이지로)
//NO 나오는 배열 순서 세는 함수 만들어야 됨.
 interface Product {
    cartId: number;
    productId: number;
    productName: string;
    productImagePath: string;
    productPrice: number;
    productCount: number;
    storeId: number;
  }
  
  interface OrderData {
    orderId: number;
    orderProducts: Product[];
    totalPrice: number;
    orderTimestamp: string;
    deliveryStatus: string;
  }
  
  interface PageInfo {
    page: number;
    size: number;
    totalElement: number;
    totalPage: number;
  }
  
  interface Data {
    orderdata: OrderData[];
    pageInfo: PageInfo;
  }

function Mypage() {
  const [editMode, setEditMode] = useState(false);
  const [nickname, setNickname] = useState('');
  const fetchData = async () => {  
    try {
      const url = `/members`;
      const response = await axiosInstance.get(url);      
      const data = response.data;    
      setNickname(data.memberName)
    } catch (error) {
      console.error('Error fetching store data:', error);
    }
  };
useEffect(() => {
    fetchData();
  }, []);

  const handleNicknameChange = async (newNickname: string) => {
    const formData = {
      memberName: newNickname
    }
    if (newNickname.trim() !== '') {
      try {
        const response = await axiosInstance.patch('/members', formData);
        setNickname(response.data.memberName);
        console.log("patch성공!")
      } catch (error) {
        console.error('Error updating nickname:', error);
      }
    }
  };

  const data: Data = {
    orderdata: [
      {
        orderId: 1,
        orderProducts: [
          {
            cartId: 1,
            productId: 1,
            productName: "맛집도넛",
            productImagePath: "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80",
            productPrice: 3333,
            productCount: 1,
            storeId: 1
          },
          {
            cartId: 2,
            productId: 2,
            productName: "도너츠링",
            productImagePath: "https://images.unsplash.com/photo-1588861472194-6883d8b5e552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
            productPrice: 2222,
            productCount: 1,
            storeId: 1
          },
        ],
        totalPrice: 5555,
        orderTimestamp: "2023-07-20T13:01:17",
        deliveryStatus: "배송완료",
      },
      {
        orderId: 2,
        orderProducts: [
          {
            cartId: 3,
            productId: 3,
            productName: "맛난빵",
            productImagePath: "https://images.unsplash.com/photo-1631397833242-fc6213046352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
            productPrice: 100,
            productCount: 1,
            storeId: 1
          },
          {
            cartId: 4,
            productId: 4,
            productName: "딜리샤스",
            productImagePath: "https://plus.unsplash.com/premium_photo-1664547606517-42d7b1113290?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
            productPrice: 300,
            productCount: 2,
            storeId: 1
          },
          {
            cartId: 5,
            productId: 5,
            productName: "슈크링",
            productImagePath: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80",
            productPrice: 500,
            productCount: 3,
            storeId: 1
          },
        ],
        totalPrice: 9999,
        orderTimestamp: "2023-07-18T13:01:17",
        deliveryStatus: "배송중",
      },
      {
        orderId: 3,
        orderProducts: [
          {
            cartId: 3,
            productId: 3,
            productName: "도넛",
            productImagePath: "https://images.unsplash.com/photo-1586657263857-346c4b712ff5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80",
            productPrice: 100,
            productCount: 1,
            storeId: 1
          },
          
          {
            cartId: 5,
            productId: 5,
            productName: "슈크링",
            productImagePath: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80",
            productPrice: 500,
            productCount: 3,
            storeId: 1
          },
        ],
        totalPrice: 3000,
        orderTimestamp: "2023-07-18T13:01:17",
        deliveryStatus: "배송중",
      },
      {
        orderId: 4,
        orderProducts: [
          {
            cartId: 3,
            productId: 3,
            productName: "빵쟁이",
            productImagePath: "https://images.unsplash.com/photo-1599940778173-e276d4acb2bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=855&q=80",
            productPrice: 100,
            productCount: 1,
            storeId: 1
          },
          {
            cartId: 4,
            productId: 4,
            productName: "딜리샤스",
            productImagePath: "https://plus.unsplash.com/premium_photo-1664547606517-42d7b1113290?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
            productPrice: 300,
            productCount: 2,
            storeId: 1
          },
          {
            cartId: 5,
            productId: 5,
            productName: "슈크링",
            productImagePath: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80",
            productPrice: 500,
            productCount: 3,
            storeId: 1
          },
        ],
        totalPrice: 355,
        orderTimestamp: "2023-07-18T13:01:17",
        deliveryStatus: "배송중",
      },
      {
        orderId: 5,
        orderProducts: [
          {
            cartId: 3,
            productId: 3,
            productName: "공갈빵",
            productImagePath: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
            productPrice: 100,
            productCount: 1,
            storeId: 1
          },
          {
            cartId: 4,
            productId: 4,
            productName: "딜리샤스",
            productImagePath: "https://plus.unsplash.com/premium_photo-1664547606517-42d7b1113290?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
            productPrice: 300,
            productCount: 2,
            storeId: 1
          }
        ],
        totalPrice: 888,
        orderTimestamp: "2023-07-18T13:01:17",
        deliveryStatus: "배송중",
      },
      {
        orderId: 6,
        orderProducts: [
          {
            cartId: 3,
            productId: 3,
            productName: "크루아상",
            productImagePath: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80",
            productPrice: 100,
            productCount: 1,
            storeId: 1
          },
          {
            cartId: 4,
            productId: 4,
            productName: "딜리샤스",
            productImagePath: "https://plus.unsplash.com/premium_photo-1664547606517-42d7b1113290?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
            productPrice: 300,
            productCount: 2,
            storeId: 1
          }
        ],
        totalPrice: 888,
        orderTimestamp: "2023-07-18T13:01:17",
        deliveryStatus: "배송중",
      }
    ],
    pageInfo: {
      page: 1,
      size: 20,
      totalElement: 2,
      totalPage: 2,
    },
  };
  return <div style={{ marginTop: '160px', display: 'flex', justifyContent:'center' }}>
    <MyPageWrapper>
      <WelcomeText>안녕하세요, <span style={{color: 'var(--purple)'}}>{nickname}</span>님!</WelcomeText>
      <section style={{borderTop:"2px solid var(--light-purple)", margin:"20px", padding:"30px"}}>
        <MyInfoSection>
          <img src="../../../src/assets/images/profile.png" style={{width: '200px', paddingRight:'10px'}}/>
          <MyInfoDetail>
         {editMode ? (
          <EditableNickname
            nickname={nickname}
            onNicknameChange={handleNicknameChange}
            onEditModeToggle={() => setEditMode(!editMode)}
          />
        ) : (
          <>
            <h3>{nickname}</h3>
            <span
              style={{ fontSize: '14px', color: 'var(--purple)', cursor: 'pointer'}}
              onClick={() => setEditMode(!editMode)}
            >
              회원 정보 수정
            </span>
          </>
        )}
            </MyInfoDetail>
        </MyInfoSection>
      </section>
      <MyOrderSection>
        <h2>나의 주문</h2>
       <MyOrderLists>
       <MypageOrderTab />
        {data.orderdata.length===0 ?
        <>
          <BsFillGearFill style={{fontSize:'30px', color: 'var(--dark-gray)', margin: '15px'}}/>
          <p style={{color: 'var(--dark-gray)', fontWeight:'800'}}>주문내역이 없습니다.</p>
          </>
        :(
          data.orderdata.map((order) => (
            <MypageOrderList key={order.orderId} products={order} />
          ))
        )}
      </MyOrderLists>
      <Pagination data={data}/>
      </MyOrderSection>      
    </MyPageWrapper>
  </div>;
}
export default Mypage;

const MyPageWrapper = styled.section`
  width: 70%;
  margin-bottom: 80px;
`
const WelcomeText = styled.p`
   font-weight:800;
   color: var(--dark-gray);
   text-align:center; 
   margin-bottom:30px; 
   font-size:18px;
`
const MyInfoSection = styled.section`
  width: 100%;
  display: flex;
  padding: 1rem; 
`
const MyInfoDetail = styled.section`
  margin-left: 2rem;
  margin-top: 3.3rem;
  min-width: 300px;
  h3 {
    color: var(--light-gray);
    margin-bottom: 2.3rem;
    font-size: 18px;
    font-weight: 800;
  }
  @media (max-width: 780px) {
    margin-left: 0.5rem;
}
`
const MyOrderSection= styled.section`
  padding: 3rem 1rem;
  border: 1px solid var(--light-purple);
  border-radius: 10px;
  h2 {
  font-weight:800;
  font-size:18px; 
  color:var(--light-gray);
  margin-bottom:10px; 
  margin-left: 20px
  }
`
const MyOrderLists= styled.section`
padding: 1rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
div{
  width: 100%;
}
`