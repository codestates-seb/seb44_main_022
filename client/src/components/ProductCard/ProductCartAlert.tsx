import styled from 'styled-components';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
 
function ProductCartAlert() {
    return (
    <CartAlertWrapper>
        <CartAlert>
            <BsFillCartCheckFill style={{fontSize:'28px',color: 'var(--dark-purple)', marginBottom: '13px'}}/>
            <p style={{color: 'var(--dark-purple)', fontWeight:'600', fontSize:'17px', textAlign:'center'}}>장바구니에 추가되었습니다.</p>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
                <Link to='/store'><Button style={{color:'var(--white)'}}>계속 쇼핑하기</Button></Link>
                <Link to='/cart'><Button style={{color:'var(--white)'}}>장바구니 보기</Button></Link>
            </div>
        </CartAlert>
    </CartAlertWrapper>
  );
}
export default ProductCartAlert;

const CartAlertWrapper = styled.section`
position: absolute;
left: 50%;
bottom: 50%;
display: flex;
justify-content: center;
align-items: center;
`
const CartAlert = styled.div`
    background-color: #ffffff;
    width: 300px;
    height: 200px;
    z-index: 9;
    border: 1px solid var(--purple);
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Button = styled.button`
    background-color: var(--dark-purple);
    width: 120px;
    height: 50px;
    border: none;
    border-radius: 10px;
    margin: 4px;
    transition: all 0.3s;
    cursor: pointer;
    &:hover{
        transition: all 0.3s;
        background-color: #353361;
    }
`