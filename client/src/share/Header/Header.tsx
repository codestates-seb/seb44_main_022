import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import login_img from '../../assets/images/login_img.png';
import logout_img from '../../assets/images/logout_img.png';
import cart_img from '../../assets/images/cart_img.png';
import chatlist_img from '../../assets/images/chatlist_img.png';
import { LocalStorage } from '../../utils/browserStorage';
import {
  BASE_ANIMATION_TIME,
  LOCAL_STORAGE_KEY_LIST,
} from '../../assets/constantValue/constantValue';
import { postLogout } from '../../api/authApis';
import useScreenResize from '../../hooks/useScreenResize';
import useAuthAnimation from '../../hooks/useAuthAnimation';
import {
  AuthRelativeContainer,
  DropDownContainer,
  DropDownContent,
  HeaderContainer,
  HeaderLogo,
  Icon,
  IconDiv,
  LinkText,
  SmallLinkText,
} from './Header.style';
import HamburgerMenu from './HamburgerMenu';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const { animation, setAnimation } = useAuthAnimation();

  const handleResize = () => {
    if (window.innerWidth > 700) {
      setIsOpenMenu(false);
    }
  };

  const clickLogout = () => {
    postLogout()
      .then(() => {
        alert('로그아웃 되었습니다.');
        LocalStorage.clear();
        navigate('/');
      })
      .catch(() => console.log('로그아웃을 할 수 없습니다: noCookie'));
  };

  useScreenResize(handleResize);

  useEffect(() => {
    if (location.pathname === '/auth' && animation === 'fadeIn') {
      setTimeout(() => setAnimation('fadeOut'));
      return;
    }
    if (location.pathname !== '/auth') {
      setTimeout(() => setAnimation('fadeIn'), BASE_ANIMATION_TIME);
      return;
    }
  }, [location]);

  return (
    <HeaderContainer animation={animation}>
      <HeaderLogo>
        <Link to="/">BUYTE</Link>
      </HeaderLogo>
      <div style={{ display: 'flex', width: '40%', justifyContent: 'space-around' }}>
        <LinkText to="/map">Map</LinkText>
        <LinkText to="/select">Order</LinkText>
        <LinkText to="/mypage">Mypage</LinkText>
      </div>
      {LocalStorage.get(LOCAL_STORAGE_KEY_LIST.AccessToken) ? (
        <>
          <AuthRelativeContainer>
            {LocalStorage.get(LOCAL_STORAGE_KEY_LIST.MemberRole) === 'SELLER' && (
              <Icon to="/chatList">
                <img src={chatlist_img} alt="ChatList" style={{ width: '3rem' }} />
                <SmallLinkText>채팅목록</SmallLinkText>
              </Icon>
            )}
            <Icon to="/cart">
              <img src={cart_img} alt="Cart" style={{ width: '3rem' }} />
              <SmallLinkText>장바구니</SmallLinkText>
            </Icon>
            <IconDiv onClick={clickLogout}>
              <img src={logout_img} alt="Login" style={{ width: '3rem' }} />
              <SmallLinkText>LOGOUT</SmallLinkText>
            </IconDiv>
          </AuthRelativeContainer>
          <DropDownContainer onClick={() => setIsOpenMenu(!isOpenMenu)} isOpenMenu={isOpenMenu}>
            <HamburgerMenu isOpenMenu={isOpenMenu} />
            <DropDownContent>
              {LocalStorage.get(LOCAL_STORAGE_KEY_LIST.MemberRole) === 'SELLER' && (
                <Link to="/chatList">
                  <li>
                    <img src={chatlist_img} alt="ChatList" style={{ width: '2rem' }} />
                    <div>채팅목록</div>
                  </li>
                </Link>
              )}

              <Link to="/cart">
                <li>
                  <img src={cart_img} alt="Cart" style={{ width: '2rem' }} />
                  <div>장바구니</div>
                </li>
              </Link>
              <li onClick={clickLogout}>
                <img src={login_img} alt="Login" style={{ width: '2rem' }} />
                <div>LOGOUT</div>
              </li>
            </DropDownContent>
          </DropDownContainer>
        </>
      ) : (
        <>
          <AuthRelativeContainer>
            <Icon to="/auth">
              <img src={login_img} alt="Login" style={{ width: '3rem' }} />
              <SmallLinkText>LOGIN</SmallLinkText>
            </Icon>
          </AuthRelativeContainer>
          <DropDownContainer onClick={() => setIsOpenMenu(!isOpenMenu)} isOpenMenu={isOpenMenu}>
            <HamburgerMenu isOpenMenu={isOpenMenu} />
            <DropDownContent>
              <Link to="/auth">
                <li>
                  <img src={login_img} alt="Login" style={{ width: '2rem' }} />
                  <div>LOGIN</div>
                </li>
              </Link>
            </DropDownContent>
          </DropDownContainer>
        </>
      )}
    </HeaderContainer>
  );
}

export default Header;
