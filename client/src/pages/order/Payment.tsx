import { useLocation } from 'react-router';
import { AiOutlineCheckCircle, AiOutlineCreditCard, AiOutlineShoppingCart } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CART_CATEGORY_NAME } from '../../assets/constantValue/constantValue';
import { CartItemType } from '../../assets/interface/Cart.interface';
import CartItem from '../../components/CartItem/CartItem';
import { RootState } from '../../redux/store/store';
import RectangleButton from '../../components/RectangleButton/RectangleButton';
import { requestPay } from '../../PaymentWindow';
import { getCartList, postSelectedCartList } from '../../api/orderApis';
import {
  CartCategory,
  CartCategoryArrow,
  CartCategoryContainer,
  CartContainer,
  CartListName,
  TotalPaymentContainer,
} from './ShoppingCart/ShoppingCart.style';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const idList: number[] = useSelector((state: RootState) => state.cartReducer.idList);
  const [cartList, setCartList] = useState<CartItemType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [orderUserName, setOrderUserName] = useState<string>('');
  const [shippingAddress, setShippingAddress] = useState<string>('');

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state) {
        navigate('/cart');
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  useEffect(() => {
    if (location.state === 'all') {
      getCartList().then((res) => {
        setCartList(res.data.cartInfos);
        setTotalPrice(res.data.totalPrice);
      });
      return;
    }
    if (location.state === 'selected') {
      const storedIdList = localStorage.getItem('idList');
      const ids = storedIdList ? JSON.parse(storedIdList) : idList;
      localStorage.setItem('idList', JSON.stringify(ids));
      postSelectedCartList(ids).then((res) => {
        setCartList(res.data.cartInfos);
        setTotalPrice(res.data.totalPrice);
      });
      return;
    }
  }, []);

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
          ></CartListName>
        </div>
        {cartList.length > 0 &&
          cartList.map((e, idx) => <CartItem items={e} idx={idx} key={e.cartId} />)}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.5rem',
            marginTop: '5rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline' }}>
            <div style={{ fontSize: '22px', fontWeight: 'bold' }}>주문자 정보</div>
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
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderTop: '2px solid gray',
            width: '100%',
            padding: '1rem 2rem',
            paddingTop: '2.5rem',
            rowGap: '1rem',
          }}
        >
          <div style={{ width: '100%' }}>
            <label htmlFor="asd" style={{ marginRight: '1.5rem' }}>
              주문자명
            </label>
            <input
              id="asd"
              style={{ padding: '0.5rem', width: '50%' }}
              onChange={(e) => setOrderUserName(e.target.value)}
            />
          </div>
          <div style={{ width: '100%' }}>
            <label htmlFor="asd" style={{ marginRight: '1.5rem' }}>
              주소
            </label>
            <input
              id="asd"
              style={{ padding: '0.5rem', width: '80%' }}
              onChange={(e) => setShippingAddress(e.target.value)}
            />
          </div>
        </div>
        <TotalPaymentContainer style={{ flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '22px', fontWeight: 'bold', margin: '0.5rem 0' }}>
              <span style={{ color: 'var(--gold)' }}>{totalPrice.toLocaleString()}</span>원
            </div>
            <div style={{ margin: '0.5rem 0', fontWeight: 'bold' }}>상품금액</div>
          </div>
          <div style={{ fontSize: '50px', margin: '0 4rem' }}>+</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '22px', fontWeight: 'bold', margin: '0.5rem 0' }}>
              <span style={{ color: 'var(--gold)' }}>{Number(3500).toLocaleString()}</span>원
            </div>
            <div style={{ margin: '0.5rem 0', fontWeight: 'bold' }}>배송비</div>
          </div>
          <div style={{ fontSize: '50px', margin: '0 4rem' }}>=</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '22px', fontWeight: 'bold', margin: '0.5rem 0' }}>
              <span style={{ color: 'var(--gold)' }}>{(totalPrice + 3500).toLocaleString()}</span>원
            </div>
            <div style={{ margin: '0.5rem 0', fontWeight: 'bold' }}>주문금액</div>
          </div>
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
            text="이전화면"
            types="white"
            clickEvent={() => {
              navigate(-1);
            }}
          />
          <RectangleButton
            text="결제하기"
            types="purple"
            clickEvent={() =>
              requestPay(orderUserName, shippingAddress, cartList, () =>
                navigate('/complete', { state: { rightPass: true }, replace: true })
              )
            }
          />
        </div>
      </div>
    </CartContainer>
  );
}

export default Payment;
