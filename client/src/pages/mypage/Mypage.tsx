import styled from 'styled-components';
import { BsFillGearFill } from 'react-icons/bs';
import  { useState, useEffect } from 'react';
import axiosInstance from '../../api/apis';
import { Data } from '../../assets/interface/Mypage.interface'
import MypageOrderTab from './MypageOrderTab';
import MypageOrderList from './MypageOrderList';
import EditableNickname from './EditableNickname';
import Pagination from './Paigination';

//페이지네이션(5개 이상의 리스트가 들어올 시 다음 페이지로)
//페이지 수 선택 가능하게 하고십당.....
//NO 나오는 배열 순서 세는 함수 만들어야 됨.
function Mypage() {
  const [editMode, setEditMode] = useState(false);
  const [nickname, setNickname] = useState('');
  const [orderlist, setOrderlist] = useState<Data | null>(null);
  console.log(orderlist)
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
    fetchOrderList();
  }, []);

  const handleNicknameChange = async (newNickname: string) => {
    const formData = {
      memberName: newNickname
    }
    if (newNickname.trim() !== '') {
      try {
        const response = await axiosInstance.patch('/members', formData);
        setNickname(response.data.memberName);
        console.log("PATCH 성공!")
      } catch (error) {
        console.error('Error updating nickname:', error);
      }
    }
  };

  const fetchOrderList = async () => {   
    const page=1;
    const size=5;
    //일단은 고정해두고, 어떻게 처리할지 보자.
      try {
        const response = await axiosInstance.get(`/members/orders?page=${page}&size=${size}`);
        setOrderlist(response.data)
        console.log("List받아오기 성공!")
      } catch (error) {
        console.error('Error updating nickname:', error);
      }
    
  };

  if (orderlist === null) {
    return <div style={{ marginTop: '160px', textAlign: 'center' }}>로딩 중...</div>;
  }

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
        {orderlist.orderInfos.length===0 ?
        <>
          <BsFillGearFill style={{fontSize:'30px', color: 'var(--dark-gray)', margin: '15px'}}/>
          <p style={{color: 'var(--dark-gray)', fontWeight:'800'}}>주문내역이 없습니다.</p>
          </>
        :(
          orderlist.orderInfos.map((order) => (
            <MypageOrderList key={order.orderId} products={order} />
          ))
        )}
      </MyOrderLists>
      <Pagination data={orderlist}/>
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