import { BsFillCartCheckFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import {
    CartAlertWrapper,
    CartAlert,
    Button,
    WhiteButton
  } from './ProductCartAlert.style';
 
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
