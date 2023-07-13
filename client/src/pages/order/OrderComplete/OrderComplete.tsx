import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
  CART_CATEGORY_NAME,
  LOCAL_STORAGE_KEY_LIST,
} from '../../../assets/constantValue/constantValue';
import RectangleButton from '../../../components/RectangleButton/RectangleButton';
import useGoBackRestrict from '../../../hooks/useGoBackRestrict';
import { CartCategoryName, CartContainer } from '../ShoppingCart/ShoppingCart.style';
import CartCategoryList from '../../../components/CartCategoryList';
import { LocalStorage } from '../../../utils/browserStorage';
import { OrderCompleteMessageContainer } from './OrderComplete.style';

function OrderComplete() {
  const navigate = useNavigate();
  const { state, pathname } = useLocation();

  useGoBackRestrict(navigate, '/');

  useEffect(() => {
    if (state === null) {
      LocalStorage.set<number[]>(LOCAL_STORAGE_KEY_LIST.IdList, []);
      navigate('/cart');
    }
  }, [state]);

  return (
    <CartContainer>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <CartCategoryName>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline' }}>
            <div style={{ fontSize: '22px', fontWeight: 'bold' }}>Order Complete</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '23.5rem' }}>
            {CART_CATEGORY_NAME.map((category) => (
              <CartCategoryList category={category} pathname={pathname} key={category.path} />
            ))}
          </div>
        </CartCategoryName>
        <OrderCompleteMessageContainer>
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
            <p style={{ fontSize: '14px', textAlign: 'center' }}>
              결제 주문 내역을 확인하고 싶으시다면, 마이페이지에서 확인 가능합니다.
              <br />
              기타 문의사항은 BUYTE 관리자에게 연락 부탁드립니다.
            </p>
          </div>
        </OrderCompleteMessageContainer>

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
            handleClick={() => {
              navigate('/');
            }}
          />
          <RectangleButton
            text="쇼핑하러가기"
            types="purple"
            handleClick={() => navigate('/select')}
          />
        </div>
      </div>
    </CartContainer>
  );
}

export default OrderComplete;
