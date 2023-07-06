import styled, { css } from 'styled-components';
import { MdCheckBox } from 'react-icons/md';
import { BsFillGearFill } from 'react-icons/bs';
import { AiOutlineShoppingCart, AiOutlineCreditCard, AiOutlineCheckCircle } from 'react-icons/ai';
import { CARTLIST } from '../../components/CartItem';
import CartItem from '../../components/CartItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '70%',
        margin: '11rem auto 10rem auto',
        minWidth: '500px',
        height: 'auto',
      }}
    >
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
            <CartCategoryContainer>
              <AiOutlineShoppingCart />
              <CartCategory location={location.pathname === '/cart'}>Cart</CartCategory>
              <CartCategoryArrow>{'>'}</CartCategoryArrow>
            </CartCategoryContainer>
            <CartCategoryContainer>
              <AiOutlineCreditCard />
              <CartCategory location={location.pathname === '/payment'}>Payment</CartCategory>
              <CartCategoryArrow>{'>'}</CartCategoryArrow>
            </CartCategoryContainer>
            <CartCategoryContainer>
              <AiOutlineCheckCircle />
              <CartCategory location={location.pathname === '/complete'}>
                Order Complete
              </CartCategory>
            </CartCategoryContainer>
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
          <div
            style={{
              borderBottom: '1px solid gray',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem 0',
            }}
          >
            <BsFillGearFill />
            <div>장바구니가 비어 있습니다.</div>
          </div>
        )}

        <div
          style={{
            margin: '2rem 0',
            display: 'flex',
            columnGap: '0.5rem',
            justifyContent: 'flex-start',
          }}
        >
          <button
            style={{
              border: 'none',
              backgroundColor: 'var(--purple)',
              color: 'white',
              padding: '1rem 2rem',
            }}
            onClick={handleSelectedDelete}
          >
            선택 삭제
          </button>
          <button
            style={{
              border: '1px solid var(--purple)',
              backgroundColor: 'var(--dark-gray)',
              color: 'white',
              padding: '1rem 2rem',
            }}
            onClick={handleAllSelected}
          >
            전체 선택
          </button>
        </div>
        <div
          style={{
            margin: '2rem 0',
            borderTop: '2px solid gray',
            borderBottom: '1px solid gray',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '3.5rem 0',
          }}
        >
          <div style={{ fontSize: '22px', fontWeight: 'bold', margin: '0.5rem 0' }}>
            <span style={{ color: 'var(--gold)' }}>{totalPrice}</span>원
          </div>
          <div style={{ margin: '0.5rem 0', fontWeight: 'bold' }}>주문금액</div>
        </div>
        <div
          style={{
            margin: '2rem 0',
            display: 'flex',
            columnGap: '0.5rem',
            justifyContent: 'center',
          }}
        >
          <button
            style={{
              border: '1px solid var(--purple)',
              backgroundColor: 'var(--white)',
              color: 'var(--purple)',
              padding: '1rem 2rem',
            }}
          >
            쇼핑하러가기
          </button>
          <button
            style={{
              border: '1px solid var(--purple)',
              backgroundColor: 'var(--purple)',
              color: 'white',
              padding: '1rem 2rem',
            }}
            onClick={() => navigate('/payment', { state: 'Selected' })}
          >
            선택상품주문
          </button>
          <button
            style={{
              border: '1px solid var(--purple)',
              backgroundColor: 'var(--dark-gray)',
              color: 'white',
              padding: '1rem 2rem',
            }}
            onClick={() => navigate('/payment', { state: 'All' })}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;전체주문&nbsp;&nbsp;&nbsp;&nbsp;
          </button>
        </div>
      </div>
    </div>
  );
}

const CartCategoryContainer = styled.div`
  position: relative;
  display: flex;
`;

const CartCategory = styled.div<{ location: boolean }>`
  padding-left: 1rem;
  ${({ location }) =>
    location &&
    css`
      font-weight: bold;
    `}
`;

const CartCategoryArrow = styled.div`
  position: absolute;
  top: 0;
  right: -20px;
`;

const CartListName = styled.div<{ grow: number; minWidth?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: ${({ grow }) =>
    css`
      ${grow}%
    `};

  min-width: ${({ minWidth }) =>
    minWidth
      ? css`
          ${minWidth}px
        `
      : css`120px`};
`;

export default ShoppingCart;
