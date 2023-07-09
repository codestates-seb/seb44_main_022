import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineCheckCircle, AiOutlineCreditCard, AiOutlineShoppingCart } from 'react-icons/ai';
import { useEffect } from 'react';
import { CART_CATEGORY_NAME } from '../../assets/constantValue/constantValue';
import RectangleButton from '../../components/RectangleButton/RectangleButton';
import {
  CartCategory,
  CartCategoryArrow,
  CartCategoryContainer,
  CartContainer,
} from './ShoppingCart/ShoppingCart.style';

function Complete() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state) {
        navigate('/');
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  useEffect(() => {
    if (location.state === null) {
      alert('잘못된 이동 요청입니다.');
      localStorage.setItem('idList', JSON.stringify([]));
      navigate('/cart');
    }
  }, [location.state]);

  return (
    <CartContainer>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline' }}>
            <div style={{ fontSize: '22px', fontWeight: 'bold' }}>Payment</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '23.5rem' }}>
            {CART_CATEGORY_NAME.map((name) => (
              <CartCategoryContainer key={name.path}>
                {name.icon === 'cart' ? (
                  <AiOutlineShoppingCart />
                ) : name.icon === 'payment' ? (
                  <AiOutlineCreditCard />
                ) : (
                  <AiOutlineCheckCircle />
                )}

                <CartCategory location={location.pathname === name.path}>{name.name}</CartCategory>
                {name.arrowDesign && <CartCategoryArrow>{'>'}</CartCategoryArrow>}
              </CartCategoryContainer>
            ))}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1.5rem',
            marginTop: '5rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '30px', fontWeight: 'bold', margin: '2rem' }}>
              주문이 완료되었습니다!
            </div>
            <div style={{ fontSize: '14px' }}>
              결제 주문 내역을 확인하고 싶으시다면, 마이페이지에서 확인 가능합니다.
            </div>
            <div style={{ fontSize: '14px' }}>
              기타 문의사항은 BUYTE 관리자에게 연락 부탁드립니다.
            </div>
          </div>
        </div>

        <div
          style={{
            margin: '2rem 0',
            display: 'flex',
            columnGap: '0.5rem',
            justifyContent: 'center',
          }}
        >
          <RectangleButton
            text="홈으로 가기"
            types="white"
            clickEvent={() => {
              navigate('/');
            }}
          />
          <RectangleButton
            text="쇼핑하러가기"
            types="purple"
            clickEvent={() => navigate('/select')}
          />
        </div>
      </div>
    </CartContainer>
  );
}

export default Complete;
