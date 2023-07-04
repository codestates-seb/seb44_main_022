import { FunctionComponent } from 'react';
import styled from 'styled-components';
import login_img from '../assets/images/cart_img.png';
import cart_img from '../assets/images/login_img.png';
import logo from '../assets/images/logo.png';
const LoginIcon = styled.img`
  position: absolute;
  top: 0px;
  right: 12.74px;
  width: 35.41px;
  height: 33.25px;
`;
const Login = styled.div`
  position: absolute;
  top: 41.08px;
  right: 0px;
  line-height: 30px;
  display: flex;
  align-items: center;
  width: 54.65px;
  height: 25.63px;
`;
const LoginContainer = styled.div`
  position: absolute;
  top: 47.29px;
  right: 59.35px;
  width: 54.65px;
  height: 66.71px;
`;
const LinkMap = styled.div`
  position: absolute;
  top: 104px;
  right: 46%;
  transform: translateX(50%);
  line-height: 60px;
  color: var(--dark-gray);
  display: flex;
  align-items: center;
  width: 10%;
  height: 48px;
  font-size: 1.3rem;
  font-family: 'Yaldevi', sans-serif;
`;

const LinkOrder = styled.div`
  position: absolute;
  top: 100px;
  right: 67%;
  transform: translateX(50%);
  line-height: 60px;
  font-size: 1.3rem;
  font-family: 'Yaldevi', sans-serif;
  color: var(--dark-gray);
`;

const LinkMypage = styled.div`
  position: absolute;
  top: 115px;
  right: 26%;
  transform: translateX(50%);
  line-height: 30px;
  display: flex;
  align-items: center;
  width: 18%;
  height: 24px;
  font-size: 1.3rem;
  font-family: 'Yaldevi', sans-serif;
  color: var(--dark-gray);
`;
const Buyte = styled.div`
  position: absolute;
  top: 49px;
  right: 50%;
  transform: translateX(50%);
  line-height: 60px;
  font-family: 'Just Another Hand', cursive;
  font-size: 3rem;
  display: flex;
  align-items: center;
  height: 37px;
`;
const LinkMy = styled.div`
  position: absolute;
  top: 43.54px;
  right: 0px;
  line-height: 30px;
  display: flex;
  align-items: center;
  width: 78.13px;
  height: 25.63px;
`;
const CartIcon = styled.img`
  position: absolute;
  top: 0px;
  right: 27px;
  width: 40.53px;
  height: 33.46px;
`;
const CartContainer = styled.div`
  position: absolute;
  top: 45px;
  right: 127.87px;
  width: 78.13px;
  height: 69.16px;
  color: var(--light-purple);
`;
const Icon = styled.img`
  position: absolute;
  top: 25px;
  right: calc(50% + 5rem); /* 수정된 부분 */
  transform: translateX(50%);
  width: 52px;
  height: 73px;
  object-fit: cover;
  transform: rotate(45deg);

  @media (max-width: 768px) {
  }
`;

const HeaderContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: var(--light-purple);
  width: 100%;
  height: 160px;
  display: flex;
`;
const HeaderRoot = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 238px;
  overflow: hidden;
  text-align: left;
  color: var(--light-purple);
`;

const Header: FunctionComponent = () => {
  return (
    <HeaderRoot>
      <HeaderContainer>
        <LoginContainer>
          <LoginIcon src={login_img} alt="Login" />
          <Login>LOGIN</Login>
        </LoginContainer>
        <LinkMap>Map</LinkMap>
        <LinkOrder>Order</LinkOrder>
        <LinkMypage>Mypage</LinkMypage>
        <Buyte>BUYTE</Buyte>
        <CartContainer>
          <LinkMy>장바구니</LinkMy>
          <CartIcon src={cart_img} alt="Cart" />
        </CartContainer>
        <Icon src={logo} alt="Logo" />
      </HeaderContainer>
    </HeaderRoot>
  );
};

export default Header;
