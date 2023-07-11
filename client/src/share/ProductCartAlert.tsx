import styled from 'styled-components';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
 
interface ProductCartAlertProps {
    closeModal: () => void;
  }
  
function ProductCartAlert({ closeModal }: ProductCartAlertProps) {
    const handleContinueShopping = () => {
        closeModal();
      };
    return (
    <CartAlertWrapper>
        <CartAlert>
            <BsFillCartCheckFill style={{fontSize:'28px', color: 'var(--dark-purple)', marginBottom: '13px'}}/>
            <p style={{color: 'var(--dark-purple)', fontWeight:'600', fontSize:'17px', textAlign:'center'}}>장바구니에 추가되었습니다.</p>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
                <Button style={{color:'var(--white)'}} onClick={handleContinueShopping} >계속 쇼핑하기</Button>
                <Link to='/cart'>
                    <WhiteButton>장바구니 보기</WhiteButton>
                </Link>
            </div>
        </CartAlert>
    </CartAlertWrapper>
  );
}
export default ProductCartAlert;

const CartAlertWrapper = styled.section`
    display: flex;
    align-items: center;
    z-index: 11;
`
const CartAlert = styled.div`
    background-color: #ffffff;
    width: 300px;
    height: 200px;
    border: 3px solid var(--purple);
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
const WhiteButton = styled(Button)`
  background-color: var(--white);
  color: var(--purple);
  border: 1px solid var(--purple);
  &:hover {
    background-color: var(--gray);
  }
`;