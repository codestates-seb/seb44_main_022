import styled, { css } from 'styled-components';
import { MdCheckBox } from 'react-icons/md';
import { BsFillGearFill } from 'react-icons/bs';
import { AiOutlineShoppingCart, AiOutlineCreditCard, AiOutlineCheckCircle } from 'react-icons/ai';
import { CARTLIST } from '../../components/CartItem';
import CartItem from '../../components/CartItem';

function ShoppingCart() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '70%',
        margin: '11rem auto 10rem auto',
        minWidth: '500px',
        height: 'calc(100vh - 21rem - 200px)',
        minHeight: '520px',
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
            <div>(0)</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '23.5rem' }}>
            <div style={{ position: 'relative', display: 'flex' }}>
              <AiOutlineShoppingCart />
              <div style={{ paddingLeft: '1rem' }}>Cart</div>
              <div style={{ position: 'absolute', top: '0', right: '-20px' }}>{'>'}</div>
            </div>
            <div style={{ position: 'relative', display: 'flex' }}>
              <AiOutlineCreditCard />
              <div style={{ paddingLeft: '1rem' }}>Payment</div>
              <div style={{ position: 'absolute', top: '0', right: '-20px' }}>{'>'}</div>
            </div>
            <div style={{ position: 'relative', display: 'flex' }}>
              <AiOutlineCheckCircle />
              <div style={{ paddingLeft: '1rem' }}>Order Complete</div>
            </div>
          </div>
        </div>
        <div
          style={{
            borderTop: '2px solid gray',
            borderBottom: '2px solid gray',
            display: 'flex',
            fontSize: '18px',
          }}
        >
          <CartListName grow={5} minWidth={60} style={{ justifyContent: 'flex-start' }}>
            <MdCheckBox />
          </CartListName>
          <CartListName grow={5} minWidth={40}></CartListName>
          <CartListName grow={75}>상품정보</CartListName>
          <CartListName grow={0} minWidth={80}>
            수량
          </CartListName>
          <CartListName grow={15} minWidth={120}>
            주문금액
          </CartListName>
        </div>
        {CARTLIST ? (
          CARTLIST.map((e) => (
            <CartItem img={e.img} title={e.title} count={e.count} price={e.price} key={e.id} />
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

        <div style={{ margin: '2rem 0' }}>
          <button
            style={{
              border: 'none',
              backgroundColor: 'var(--purple)',
              color: 'white',
              padding: '1rem 2rem',
            }}
          >
            선택 삭제
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
          <div style={{ fontSize: '22px', fontWeight: 'bold', margin: '0.5rem 0' }}>0원</div>
          <div style={{ margin: '0.5rem 0' }}>주문금액</div>
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
          >
            &nbsp;&nbsp;&nbsp;&nbsp;전체주문&nbsp;&nbsp;&nbsp;&nbsp;
          </button>
        </div>
      </div>
    </div>
  );
}

const CartListName = styled.div<{ grow: number; minWidth?: number }>`
  display: flex;
  justify-content: center;
  border-top: 1px solid gray;
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
