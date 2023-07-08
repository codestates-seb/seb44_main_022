import { MdCheckBox } from 'react-icons/md';
import { BsFillGearFill } from 'react-icons/bs';
import { AiOutlineShoppingCart, AiOutlineCreditCard, AiOutlineCheckCircle } from 'react-icons/ai';
import { CARTLIST } from '../../../components/CartItem/CartItem';
import CartItem from '../../../components/CartItem/CartItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RectangleButton from '../../../components/RectangleButton/RectangleButton';
import { CART_CATEGORY_NAME } from '../../../assets/constantValue/constantValue';
import {
  CartCategory,
  CartCategoryArrow,
  CartCategoryContainer,
  CartContainer,
  CartListName,
  EmptyCartListBox,
  TotalPaymentContainer,
} from './ShoppingCart.style';

function ShoppingCart() {
  const [initialChecked, setInitialChecked] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  // 서버 통신때 진짜로 totalPrice를 set하자.
  const location = useLocation();
  const idList = useSelector((state: RootState) => state.cartReducer.idList);

  const handleSelectedDelete = () => {
    // 서버 통신으로 delete 시키고, window.location.reload 처리하기
    console.log(idList);
  };

  const handleAllSelected = () => {
    setInitialChecked(!initialChecked);
  };

  // useEffect로 서버와 바로 통신 시도하고, 장바구니 데이터 가져오기.

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
            <div style={{ fontSize: '22px', fontWeight: 'bold' }}>Cart</div>
            <div style={{ fontWeight: 'bold' }}>({CARTLIST.length})</div>
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
            fontSize: '18px',
            backgroundColor: 'var(--light-purple)',
          }}
        >
          <CartListName
            grow={5}
            minWidth={45}
            style={{ justifyContent: 'flex-start', paddingLeft: '0.5rem' }}
          >
            No.
          </CartListName>
          <CartListName grow={5} minWidth={40} style={{ padding: '0.5rem' }}></CartListName>
          <CartListName grow={75} style={{ fontWeight: 'bold' }}>
            상품정보
          </CartListName>
          <CartListName grow={10} minWidth={100} style={{ width: '100px' }}>
            수량
          </CartListName>
          <CartListName grow={15} minWidth={110} style={{ fontWeight: 'bold' }}>
            주문금액
          </CartListName>
          <CartListName
            grow={5}
            minWidth={40}
            style={{ justifyContent: 'flex-start', fontSize: '18px', padding: '0.5rem' }}
          >
            <MdCheckBox />
          </CartListName>
        </div>
        {CARTLIST ? (
          CARTLIST.map((e, idx) => (
            <CartItem
              items={e}
              idx={idx}
              initialChecked={initialChecked}
              setTotalPrice={setTotalPrice}
              key={e.id}
            />
          ))
        ) : (
          <EmptyCartListBox>
            <BsFillGearFill />
            <div>장바구니가 비어 있습니다.</div>
          </EmptyCartListBox>
        )}

        <div
          style={{
            margin: '2rem 0',
            display: 'flex',
            columnGap: '0.5rem',
            justifyContent: 'flex-start',
          }}
        >
          <RectangleButton text="선택 삭제" types="purple" clickEvent={handleSelectedDelete} />
          <RectangleButton text="전체 선택" types="dark" clickEvent={handleAllSelected} />
        </div>
        <TotalPaymentContainer>
          <div style={{ fontSize: '22px', fontWeight: 'bold', margin: '0.5rem 0' }}>
            <span style={{ color: 'var(--gold)' }}>{totalPrice}</span>원
          </div>
          <div style={{ margin: '0.5rem 0', fontWeight: 'bold' }}>주문금액</div>
        </TotalPaymentContainer>
        <div
          style={{
            margin: '2rem 0',
            display: 'flex',
            columnGap: '0.5rem',
            justifyContent: 'center',
          }}
        >
          <RectangleButton
            text="쇼핑하러가기"
            types="white"
            clickEvent={() => navigate('/store')}
          />
          <RectangleButton
            text="선택상품주문"
            types="purple"
            clickEvent={() => navigate('/payment', { state: 'Selected' })}
          />

          <RectangleButton
            text="&nbsp;&nbsp;&nbsp;전체주문&nbsp;&nbsp;&nbsp;"
            types="dark"
            clickEvent={() => navigate('/payment', { state: 'All' })}
          />
        </div>
      </div>
    </CartContainer>
  );
}

export default ShoppingCart;