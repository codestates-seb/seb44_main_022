import { BsFillGearFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../../../redux/store/store';
import CartItem from '../../../components/CartItem/CartItem';
import RectangleButton from '../../../components/RectangleButton/RectangleButton';
import { CART_CATEGORY_NAME } from '../../../assets/constantValue/constantValue';
import { CartItemTypes } from '../../../assets/interface/Cart.interface';
import { deleteCartList, getCartList } from '../../../api/orderApis';
import CartCategoryList from '../../../components/CartCategoryList';
import CartItemTab from '../../../components/CartItem/CartItemTab';
import loading from '../../../assets/images/loading.gif';
import {
  CartCategoryName,
  CartContainer,
  EmptyCartListBox,
  TotalPaymentContainer,
} from './ShoppingCart.style';

function ShoppingCart() {
  const [isLoading, setIsLoading] = useState(false);
  const [cartList, setCartList] = useState<CartItemTypes[]>([]);
  const [initialChecked, setInitialChecked] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const idList = useSelector((state: RootState) => state.cartReducer.idList);

  const handleSelectedDelete = () => {
    deleteCartList(idList)
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  };

  const handleAllSelected = () => {
    setInitialChecked(!initialChecked);
  };

  useEffect(() => {
    setIsLoading(true);
    getCartList()
      .then((res) => {
        setCartList(res.data.cartInfos);
        setTotalPrice(res.data.totalPrice);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSelectedPayment = (array: number[] | CartItemTypes[], state: string) => {
    if (array.length === 0) {
      alert('반드시 한 개 이상의 제품을 선택해야합니다.');
      return;
    }
    navigate('/payment', { state: state });
  };

  return (
    <CartContainer>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <CartCategoryName>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline' }}>
            <div style={{ fontSize: '22px', fontWeight: 'bold' }}>Cart</div>
            <div style={{ fontWeight: 'bold' }}>({cartList !== undefined && cartList.length})</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '23.5rem' }}>
            {CART_CATEGORY_NAME.map((category) => (
              <CartCategoryList category={category} pathname={pathname} key={category.path} />
            ))}
          </div>
        </CartCategoryName>
        <CartItemTab hideCheckBox={false} path="cart" />
        {isLoading ? (
          <div style={{ backgroundImage: `url(${loading})` }}>로딩중</div>
        ) : cartList !== undefined && cartList.length > 0 ? (
          cartList.map((e, idx) => (
            <CartItem
              items={e}
              idx={idx}
              initialChecked={initialChecked}
              setTotalPrice={setTotalPrice}
              key={e.cartId}
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
          <RectangleButton text="선택 삭제" types="purple" handleClick={handleSelectedDelete} />
          <RectangleButton text="전체 선택" types="dark" handleClick={handleAllSelected} />
        </div>
        <TotalPaymentContainer>
          <div style={{ fontSize: '22px', fontWeight: 'bold', margin: '0.5rem 0' }}>
            <span style={{ color: 'var(--gold)' }}>
              {totalPrice !== undefined && totalPrice.toLocaleString()}
            </span>
            원
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
            handleClick={() => navigate('/select')}
          />
          <RectangleButton
            text="선택상품주문"
            types="purple"
            handleClick={() => handleSelectedPayment(idList, 'selected')}
          />

          <RectangleButton
            text="&nbsp;&nbsp;&nbsp;전체주문&nbsp;&nbsp;&nbsp;"
            types="dark"
            handleClick={() => handleSelectedPayment(cartList, 'all')}
          />
        </div>
      </div>
    </CartContainer>
  );
}

export default ShoppingCart;
