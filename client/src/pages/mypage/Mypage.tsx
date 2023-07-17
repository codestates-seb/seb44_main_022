import styled from 'styled-components';
import { BsFillGearFill } from 'react-icons/bs';
import  { useState, useEffect } from 'react';
import axiosInstance from '../../api/apis';
import MypageOrderTab from './MypageOrderTab';
import MypageOrderList from './MypageOrderList';
import EditableNickname from './EditableNickname';

//처음에 회원의 이름, 정보 받아오기 
//페이지네이션(5개 이상의 리스트가 들어올 시 다음 페이지로)
//https://buyte.site/members로 patch 보내기 
//Content-Type:application/json
//Authorization:{-}
//{  "memberName": "변경이름"}
//엥 근데 이거 Auth로 받은 이름은 어떻게 처리함? 
 interface Product {
    cartId: number;
    productId: number;
    productName: string;
    productImagePath: string;
    productPrice: number;
    productCount: number;
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
      console.log(data)
      setNickname(data.memberName)
    } catch (error) {
      console.error('Error fetching store data:', error);
    }
  };
useEffect(() => {
    fetchData();
  }, []);

// const handleSubmit = async () => {
// const formData = {
//   storeId: storeId,
//   productId: productId,
// };
// try {
//   const url= `/store/${storeId}/${productId}`;
//   await axiosInstance.post(url, formData);
//   setProductCartAlertVisible(true);
//   console.log('POST 요청 성공');
// } catch (error) {
//   console.error('POST 요청 실패:', error);
// }
// };



  const data: Data = {
    orderdata: [
      {
        orderId: 1,
        orderProducts: [
          {
            cartId: 1,
            productId: 1,
            productName: "아이템이름1",
            productImagePath: "~",
            productPrice: 3333,
            productCount: 1,
          },
          {
            cartId: 2,
            productId: 2,
            productName: "아이템이름2",
            productImagePath: "~",
            productPrice: 2222,
            productCount: 1,
          },
        ],
        totalPrice: 5555,
        orderTimestamp: "2022.08.03",
        deliveryStatus: "배송완료",
      },
      {
        orderId: 2,
        orderProducts: [
          {
            cartId: 3,
            productId: 3,
            productName: "아이템이름3",
            productImagePath: "~",
            productPrice: 4444,
            productCount: 1,
          },
          {
            cartId: 4,
            productId: 4,
            productName: "아이템이름4",
            productImagePath: "~",
            productPrice: 5555,
            productCount: 1,
          },
        ],
        totalPrice: 9999,
        orderTimestamp: "2022.08.05",
        deliveryStatus: "배송중",
      },
    ],
    pageInfo: {
      page: 1,
      size: 20,
      totalElement: 2,
      totalPage: 1,
    },
  };
  return <div style={{ marginTop: '160px', display: 'flex', justifyContent:'center' }}>
    <MyPageWrapper>
      <p style={{fontWeight:'800', color: 'var(--dark-gray)', textAlign:'center', marginBottom:'30px'}}>안녕하세요, <span style={{color: 'var(--purple)'}}>nickname</span>님!</p>
      <MyInfoSection>
        <img src="../../../src/assets/images/profile.png" style={{width: '200px', paddingRight:'10px'}}/>
        <MyInfoDetail>
       {editMode ? (
        <EditableNickname
          nickname={nickname}
          onNicknameChange={setNickname}
          onEditModeToggle={() => setEditMode(!editMode)}
        />
      ) : (
        <>
          <h3>{nickname}</h3>
          <span
            style={{ fontSize: '14px', color: 'var(--purple)', cursor: 'pointer' }}
            onClick={() => setEditMode(!editMode)}
          >
            회원 정보 수정
          </span>
        </>
      )}
    </MyInfoDetail>
      </MyInfoSection>   
      <MyOrderSection>
        <h2 style={{fontWeight:'800', fontSize:'18px', color:'var(--light-gray)', marginBottom:'10px', marginLeft: '20px'}}>나의 주문</h2>
       <MyOrderLists>
       <MypageOrderTab />
        {data.orderdata.length===0 ?
        <>
          <BsFillGearFill style={{fontSize:'30px', color: 'var(--dark-gray)', margin: '15px'}}/>
          <p style={{color: 'var(--dark-gray)', fontWeight:'800'}}>주문내역이 없습니다.</p>
          </>
        :
        <>
        <MypageOrderList products={data.orderdata[0]}/>
        <MypageOrderList products={data.orderdata[1]}/>
        <MypageOrderList products={data.orderdata[2]}/>
        </>}
      </MyOrderLists>
      </MyOrderSection>
    </MyPageWrapper>
  </div>;
}
export default Mypage;

const MyPageWrapper = styled.section`
  width: 70%;
  margin-bottom: 80px;
`
const MyInfoSection = styled.section`
  width: 100%;
  display: flex;
  padding: 40px 30px; 
  /* flex-direction: column;
  :after{
    content:'';
    width: 100%;
    height: 1px;
    background-color: var(--dark-gray);
  } */
`
const MyInfoDetail = styled.section`
  margin-left: 30px;
  margin-top: 40px;
  h3 {
    color: var(--light-gray);
    margin-bottom: 30px;
    font-size: 18px;
    font-weight: 800;
  }
 
`
const MyOrderSection= styled.section`
  padding: 20px;
`
const MyOrderLists= styled.section`
padding: 20px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
div{
  width: 100%;
}
`