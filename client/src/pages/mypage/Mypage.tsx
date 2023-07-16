import styled from 'styled-components';
import { BsFillGearFill } from 'react-icons/bs';
import CartItemTab from '../../components/CartItem/CartItemTab';
function Mypage() {
  return <div style={{ marginTop: '160px', display: 'flex', justifyContent:'center' }}>
    <MyPageWrapper>
      <p style={{fontWeight:'800', color: 'var(--dark-gray)', textAlign:'center', marginBottom:'30px'}}>안녕하세요, <span style={{color: 'var(--purple)'}}>nickname</span>님!</p>
      <MyInfoSection>
        <div style={{width: '200px', height: '180px', backgroundColor:'gray', paddingRight:'10px'}}></div>
        <MyInfoDetail>
          <h3>nickName</h3>
          <span style={{fontSize:'13px', color:'var(--purple)', cursor:'pointer'}}>회원 정보 수정</span>
        </MyInfoDetail>
      </MyInfoSection>   
      <MyOrderSection>
        <h2 style={{fontWeight:'800', fontSize:'18px', color:'var(--light-gray)', marginBottom:'10px'}}>나의 주문</h2>
        <p style={{fontWeight:'700', color: 'var(--black)'}}>주문내역</p>
       <MyOrderDetail>
       <CartItemTab hideCheckBox={false} />
        <BsFillGearFill style={{fontSize:'30px', color: 'var(--dark-gray)', margin: '15px'}}/>
        <p style={{color: 'var(--dark-gray)', fontWeight:'800'}}>주문내역이 없습니다.</p>
      </MyOrderDetail>
      </MyOrderSection>
    </MyPageWrapper>

  </div>;
}
export default Mypage;

const MyPageWrapper = styled.section`
  width: 70%;
`
const MyInfoSection = styled.section`
  width: 100%;
  display: flex;
  padding: 40px 30px;
  background-color: aliceblue;
`
const MyInfoDetail = styled.section`
  margin-left: 30px;
  h3 {
    color: var(--light-gray);
    margin-bottom: 18px;
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