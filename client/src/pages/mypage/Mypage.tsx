import styled from 'styled-components';
import { BsFillGearFill } from 'react-icons/bs';
import  { useState } from 'react';
import MypageOrderTab from './MypageOrderTab';
import MypageOrderList from './MypageOrderList';
import EditableNickname from './EditableNickname';

//처음에 회원의 이름, 정보 받아오기 
//페이지네이션(5개 이상의 리스트가 들어올 시 다음 페이지로)
//https://buyte.site/members로 patch 보내기 
//Content-Type:application/json
//Authorization:{-}
//{  "memberName": "변경이름"}
function Mypage() {
  const [editMode, setEditMode] = useState(false);
  const [nickname, setNickname] = useState('nickname');
//   const fetchData = async () => {  
//     try {
//       const url = `/store/${storeId}/${productId}`;
//       const response = await axiosInstance.get(url);      
//       const data = response.data;    
//       setProduct(data);
//     } catch (error) {
//       console.error('Error fetching store data:', error);
//     }
//   };
// useEffect(() => {
//     fetchData();
//   }, []);

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

 // const fileInput = useRef<HTMLInputElement>(null);
  // const onClickImg = () => {
  //   if(fileInput.current){
  //     fileInput.current.click();
  //   }
  // }
  // export const convertImageUrl = async(formData: any) : Promise<any>=>{
  //   const response = await axios.post("/", formData, {
  //     headers: {
  //       "Content-Type": "multipard/form-data",
  //     },
  //   });
  //   return response.data.data.path;
  // }
  // const onChangeImage = async(e:React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   const uploadFile = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append("file", uploadFile);
  //   const responseUrl = await convertImageUrl(formData);
  //   setRevisedImage(responseUrl);
  // }
  return <div style={{ marginTop: '160px', display: 'flex', justifyContent:'center' }}>
    <MyPageWrapper>
      <p style={{fontWeight:'800', color: 'var(--dark-gray)', textAlign:'center', marginBottom:'30px'}}>안녕하세요, <span style={{color: 'var(--purple)'}}>nickname</span>님!</p>
      <MyInfoSection>
        <img src="../../../src/assets/images/profile.png" style={{width: '200px', paddingRight:'10px'}}/>
            {/* <EditUserImg src={revisedImage || profileUrl} alt="프로필 사진" onClick={onClickImg}/>
            <input type="file" id="profile_img" name="profile_img" accept=".jpg, .jpeg, .png" ref={fileInput}/>
         */}
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
       <MyOrderDetail>
       <MypageOrderTab />
        <BsFillGearFill style={{fontSize:'30px', color: 'var(--dark-gray)', margin: '15px'}}/>
        <p style={{color: 'var(--dark-gray)', fontWeight:'800'}}>주문내역이 없습니다.</p>
        <MypageOrderList/>
        <MypageOrderList/>
        <MypageOrderList/>
      </MyOrderDetail>
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
const MyOrderDetail= styled.section`
padding: 20px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
div{
  width: 100%;
}
`