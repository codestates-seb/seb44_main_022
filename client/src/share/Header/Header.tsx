import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import login_img from '../../assets/images/login_img.png';
import cart_img from '../../assets/images/cart_img.png';
import { LocalStorage } from '../../utils/browserStorage';
import { LOCAL_STORAGE_KEY_LIST } from '../../assets/constantValue/constantValue';
import { postLogout } from '../../api/authApis';
import {
  AuthRelativeContainer,
  Dd,
  DropDownContainer,
  DropDownContent,
  HeaderContainer,
  HeaderLogo,
  Icon,
  IconDiv,
  LinkText,
  SmallLinkText,
} from './Header.style';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [animation, setAnimation] = useState(() => {
    if (location.pathname === '/auth') {
      return 'none';
    }
    return 'fadeIn';
  });

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

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (location.pathname === '/auth' && animation === 'fadeIn') {
      setTimeout(() => setAnimation('fadeOut'));
      return;
    }
    if (location.pathname !== '/auth') {
      setTimeout(() => setAnimation('fadeIn'), 300);
      return;
    }
  }, [location]);

  return (
    <HeaderContainer className={`${animation}`}>
      <HeaderLogo>
        <Link to="/">BUYTE</Link>
      </HeaderLogo>
      <div style={{ display: 'flex', width: '40%', justifyContent: 'space-around' }}>
        <LinkText to="/map">Map</LinkText>
        <LinkText to="/select">Order</LinkText>
        <LinkText to="/mypage/:id">Mypage</LinkText>
      </div>
      {LocalStorage.get(LOCAL_STORAGE_KEY_LIST.AccessToken) ? (
        <>
          <AuthRelativeContainer>
            <Icon to="/cart">
              <img src={cart_img} alt="Cart" />
              <SmallLinkText>장바구니</SmallLinkText>
            </Icon>
            <IconDiv onClick={clickLogout}>
              <img src={login_img} alt="Login" />
              <SmallLinkText>LOGOUT</SmallLinkText>
            </IconDiv>
          </AuthRelativeContainer>
          <DropDownContainer onClick={() => setIsOpenMenu(!isOpenMenu)} isOpenMenu={isOpenMenu}>
            <Dd isOpenModal={isOpenMenu}>
              <span></span>
              <span></span>
              <span></span>
            </Dd>
            <DropDownContent>
              <li>
                <img src={cart_img} alt="Cart" style={{ width: '2rem' }} />
                <Link to="/cart">장바구니</Link>
              </li>
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
              <img src={login_img} alt="Login" />
              <SmallLinkText>LOGIN</SmallLinkText>
            </Icon>
          </AuthRelativeContainer>
          <DropDownContainer onClick={() => setIsOpenMenu(!isOpenMenu)} isOpenMenu={isOpenMenu}>
            메뉴
            <DropDownContent>
              <li>
                <img src={login_img} alt="Login" style={{ width: '2rem' }} />
                <Link to="/auth">LOGIN</Link>
              </li>
            </DropDownContent>
          </DropDownContainer>
        </>
      )}
    </HeaderContainer>
  );
}

export default Header;
