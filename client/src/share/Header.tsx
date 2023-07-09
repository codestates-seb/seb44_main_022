import { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import login_img from '../assets/images/cart_img.png';
import cart_img from '../assets/images/login_img.png';
import logo from '../assets/images/logo.png';
import Logo from '../components/Logo/Logo';

const LoginIcon = styled(Link)`
  position: absolute;
  top: 0px;
  right: 22px;
  width: 32.41px;
  height: 31.25px;
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
  font-size: 15px;
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
  &:hover {
    font-size: 1.35rem;
    color: var(--purple);
    cursor: pointer;
  }
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
  &:hover {
    font-size: 1.35rem;
    color: var(--purple);
    cursor: pointer;
  }
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
  &:hover {
    font-size: 1.35rem;
    color: var(--purple);
    cursor: pointer;
  }
`;
const Buyte = styled.div`
  position: absolute;
  top: 85px;
  right: 50%;
  transform: translateX(50%);
  line-height: 60px;
  font-family: 'Just Another Hand', cursive;
  font-size: 3rem;
  display: flex;
  align-items: center;
  height: 37px;
`;

const Cart = styled.div`
  position: absolute;
  top: 43.54px;
  right: 0px;
  line-height: 30px;
  display: flex;
  align-items: center;
  width: 78.13px;
  height: 25.63px;
  font-size: 15px;
`;
const CartIcon = styled(Link)`
  position: absolute;
  top: 0px;
  right: 33px;
  width: 39px;
  height: 32px;
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
  right: calc(50% + 5rem);
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
  z-index: 1;
`;

const Header: FunctionComponent = () => {
  return (
    <HeaderContainer>
      <LoginContainer>
        <LoginIcon to="/auth">
          <img src={login_img} alt="Login" />
        </LoginIcon>
        <Login>LOGIN</Login>
      </LoginContainer>
      <LinkMap>
        <Link to="/map">Map</Link>
      </LinkMap>
      <LinkOrder>
        <Link to="/select">Order</Link>
      </LinkOrder>
      <LinkMypage>
        <Link to="/mypage/:id">Mypage</Link>
      </LinkMypage>
      <Buyte>
        <Logo />
      </Buyte>
      <CartContainer>
        <CartIcon to="/cart">
          <img src={cart_img} alt="Cart" />
        </CartIcon>
        <Cart>장바구니</Cart>
      </CartContainer>
      <Icon src={logo} alt="Logo" />
    </HeaderContainer>
  );
};

export default Header;
