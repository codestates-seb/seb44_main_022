import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  CART_CATEGORY_NAME,
  DELIVERY_FEE,
  LOCAL_STORAGE_KEY_LIST,
} from '../../../assets/constantValue/constantValue';
import { CartItemTypes } from '../../../assets/interface/Cart.interface';
import CartItem from '../../../components/CartItem/CartItem';
import { RootState } from '../../../redux/store/store';
import RectangleButton from '../../../components/RectangleButton/RectangleButton';
import { getCartList, postSelectedCartList } from '../../../api/orderApis';
import useGoBackRestrict from '../../../hooks/useGoBackRestrict';
import CartCategoryList from '../../../components/CartCategoryList';
import {
  CartCategoryName,
  CartContainer,
  TotalPaymentContainer,
} from '../ShoppingCart/ShoppingCart.style';
import CartItemTab from '../../../components/CartItem/CartItemTab';
import OrderInput from '../../../components/UserInput/OrderInput';
import PriceNumberText from '../../../components/PriceNumberText';
import { LocalStorage } from '../../../utils/browserStorage';
import { requestPay } from './PaymentWindow';
import { OrderInfoContainer } from './Payment.style';

function Payment() {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const idList: number[] = useSelector((state: RootState) => state.cartReducer.idList);
  const [cartList, setCartList] = useState<CartItemTypes[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [orderUserName, setOrderUserName] = useState<string>('');
  const [shippingAddress, setShippingAddress] = useState<string>('');

  const handleClickPayment = () => {
    if (
      orderUserName !== undefined &&
      shippingAddress !== undefined &&
      orderUserName.length !== 0 &&
      shippingAddress.length !== 0
    ) {
      requestPay({
        orderUserName,
        shippingAddress,
        cartList,
        onSuccess: () => navigate('/complete', { state: { rightPass: true }, replace: true }),
      });
      return;
    }
    alert(
      '주문자 정보를 반드시 기입해주세요.\n잘못된 정보를 기입함에 있어서 Buyte는 책임지지 않습니다.'
    );
  };

  useGoBackRestrict(navigate, '/cart');

  useEffect(() => {
    switch (state) {
      case 'all':
        LocalStorage.set<number[]>(LOCAL_STORAGE_KEY_LIST.IdList, idList);
        getCartList().then((res) => {
          setCartList(res.data.cartInfos);
          setTotalPrice(res.data.totalPrice);
        });
        break;
      case 'selected': {
        const storedIdList = LocalStorage.get(LOCAL_STORAGE_KEY_LIST.IdList);
        const ids = idList !== undefined && idList.length > 0 ? idList : storedIdList;
        LocalStorage.set<number[]>(LOCAL_STORAGE_KEY_LIST.IdList, ids);
        postSelectedCartList(ids).then((res) => {
          setCartList(res.data.cartInfos);
          setTotalPrice(res.data.totalPrice);
        });
        break;
      }
      default: {
        LocalStorage.set<number[]>(LOCAL_STORAGE_KEY_LIST.IdList, []);
        navigate('/cart');
      }
    }
  }, [state]);

  return (
    <CartContainer>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <CartCategoryName>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline' }}>
            <div style={{ fontSize: '22px', fontWeight: 'bold' }}>Payment</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '23.5rem' }}>
            {CART_CATEGORY_NAME.map((category) => (
              <CartCategoryList category={category} pathname={pathname} key={category.path} />
            ))}
          </div>
        </CartCategoryName>

        <CartItemTab path="payment" />
        {cartList.length > 0 &&
          cartList.map((e, idx) => <CartItem items={e} idx={idx} key={e.cartId} />)}
        <CartCategoryName
          style={{
            marginTop: '5rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline' }}>
            <div style={{ fontSize: '22px', fontWeight: 'bold' }}>주문자 정보</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '23.5rem' }}>
            {CART_CATEGORY_NAME.map((category) => (
              <CartCategoryList category={category} pathname={pathname} key={category.path} />
            ))}
          </div>
        </CartCategoryName>
        <OrderInfoContainer>
          <OrderInput id="orderName" name="주문자명" width="50%" setState={setOrderUserName} />
          <OrderInput id="shippingAddress" name="주소" width="80%" setState={setShippingAddress} />
        </OrderInfoContainer>
        <TotalPaymentContainer style={{ flexDirection: 'row' }}>
          <PriceNumberText price={totalPrice} priceText="상품금액" />
          <div style={{ fontSize: '50px', margin: '0 4rem' }}>+</div>
          <PriceNumberText price={Number(DELIVERY_FEE)} priceText="배송비" />
          <div style={{ fontSize: '50px', margin: '0 4rem' }}>=</div>
          <PriceNumberText price={totalPrice + DELIVERY_FEE} priceText="주문금액" />
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
            handleClick={() => {
              navigate(-1);
            }}
          />
          <RectangleButton text="결제하기" types="purple" handleClick={handleClickPayment} />
        </div>
      </div>
    </CartContainer>
  );
}

export default Payment;
