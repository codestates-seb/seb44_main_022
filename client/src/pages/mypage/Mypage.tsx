import styled from 'styled-components';
import CartItemTab from '../../components/CartItem/CartItemTab';
function Mypage() {
  return <div style={{ marginTop: '160px', display: 'flex', justifyContent:'center' }}>
    <MyPageWrapper>
      <p style={{fontWeight:'800', color: 'var(--dark-gray)', textAlign:'center'}}>안녕하세요, <span style={{color: 'var(--purple)'}}>nickname</span>님!</p>
      <MyInfoSection>
        <div style={{width: '200px', height: '180px', backgroundColor:'gray', paddingRight:'10px'}}></div>
        <MyInfoDetail>
          <h3>nickName</h3>
          <span style={{fontSize:'13px', color:'var(--purple)', cursor:'pointer'}}>회원 정보 수정</span>
        </MyInfoDetail>
      </MyInfoSection>   
      <MyOrderSection>
        <h2 style={{fontWeight:'800', fontSize:'18px', color:'var(--light-gray)', marginBottom:'10px'}}>나의 주문</h2>
        <p style={{fontWeight:'500'}}>주문내역</p>
       <MyOrderDetail>
        <CartItemTab/>
        <p>주문내역이 없습니다.</p>
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
  background-color: aquamarine;
`
const MyOrderDetail= styled.section`
padding: 20px;
`