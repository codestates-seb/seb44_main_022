import { BsFillGearFill } from 'react-icons/bs';
import  { useState, useEffect } from 'react';
import axiosInstance from '../../api/apis';
import { Data } from '../../assets/interface/Mypage.interface'
import MypageOrderTab from './MypageOrderTab';
import MypageOrderList from './MypageOrderList';
import EditableNickname from './EditableNickname';
import Pagination from './Pagination';
import { MyPageWrapper, WelcomeText, MyInfoSection, MyInfoDetail, MyOrderSection, MyOrderLists, SizeSelect } from './Mypage.style';

function Mypage() {
  const [editMode, setEditMode] = useState(false);
  const [nickname, setNickname] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSize, setSelectedSize] = useState(5);
  const [filteredOrderlist, setFilteredOrderlist] = useState<Data | null>(null);

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
    fetchOrderList(currentPage);
  }, [currentPage,selectedSize]);

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

  const fetchOrderList = async (page:number) => { 
    const size = selectedSize; 
      try {
        const response = await axiosInstance.get(`/members/orders?page=${page}&size=${size}`);
        setFilteredOrderlist(response.data);
        console.log("List받아오기 성공!")
      } catch (error) {
        console.error('Error updating nickname:', error);
      }
    
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    fetchOrderList(page);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedSize = parseInt(event.target.value, 10);
    setSelectedSize(newSelectedSize);
    setCurrentPage(1); 
  };

  if (filteredOrderlist === null) {    
    return <div style={{ marginTop: '160px', display:"flex", alignItems:"center", flexDirection:"column" }}> 
    <img src="../../../src/assets/images/loading.gif"/>
    <p style={{color: 'var(--dark-gray)', fontWeight:'800', marginBottom:"10px", fontSize:"19px"}}>로딩 중입니다...</p>
    </div>;
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
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <h2>나의 주문</h2>
          <SizeSelect onChange={handleSizeChange} value={selectedSize}>
            <option value={3}>3개씩 보기</option>
            <option value={5}>5개씩 보기</option>
            <option value={10}>10개씩 보기</option>
          </SizeSelect>
        </div>
       <MyOrderLists>
       <MypageOrderTab />
        {filteredOrderlist.orderInfos.length===0 ?
        <>
          <BsFillGearFill style={{fontSize:'30px', color: 'var(--dark-gray)', margin: '15px', marginTop:"40px"}}/>
          <p style={{color: 'var(--dark-gray)', fontWeight:'800', marginBottom:"10px"}}>주문내역이 없습니다.</p>
          </>
        :(
          filteredOrderlist.orderInfos.map((order) => (
            <MypageOrderList key={order.orderId} products={order} />
          ))
        )}
      </MyOrderLists>
      <Pagination data={filteredOrderlist} currentPage={currentPage} onPageChange={handlePageChange}/>
      </MyOrderSection>      
    </MyPageWrapper>
  </div>;
}
export default Mypage;
