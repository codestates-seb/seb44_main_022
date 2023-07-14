import { FunctionComponent, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Item1 = styled.div`
  position: absolute;
  line-height: 1.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  width: 16.62rem;
  height: 1.7rem;
  color: var(--white);
  font-size: 15px;
`;
const Item2 = styled.div`
  position: absolute;
  top: 1.125rem;
  left: 0;
  font-size: 12px;
  line-height: 1.125rem;
  font-weight: 300;
  color: var(--white);
  display: flex;
  align-items: center;
  width: 15.625rem;
  height: 1.125rem;
`;

const CopyrightBuyteAll = styled.div`
  position: absolute;
  top: 48px;
  left: 0px;
  color: var(--white);
  line-height: 18px;
  font-weight: 300;
  display: flex;
  align-items: center;
  width: 226.2px;
  height: 17px;
  font-size: 13px;
`;
const Item3 = styled.div`
  position: absolute;
  top: -31.5px;
  left: 1px;
  line-height: 19.5px;
  color: var(--white);
  font-weight: 500;
  display: flex;
  align-items: center;
  width: 244px;
  height: 19px;
  font-size: 10px;
`;
const DivfooterText2 = styled.div`
  position: absolute;
  top: 129.5px;
  left: 224px;
  width: 1476.44px;
  height: 66px;
  display: flex;
`;
const Buyte = styled.div`
  position: absolute;
  top: 34px;
  left: 20px;
  font-size: 25px;
  color: var(--white);
  line-height: 60px;
  font-family: 'Indie Flower', cursive;
  display: flex;
  align-items: center;
  width: 203px;
  height: 37px;
`;
const Item4 = styled.div`
  position: absolute;
  top: 0px;
  left: 10px;
  color: var(--white);
  line-height: 19.5px;
  font-weight: 500;
  font-size: 13px;
`;
const Item5 = styled.b`
  position: absolute;
  top: 31.5px;
  left: 10px;
  color: var(--white);
  line-height: 25.5px;
  font-size: 13px;
`;
const Item6 = styled.div`
  position: absolute;
  top: 65px;
  left: 10px;
  line-height: 18px;
  color: var(--white);
  font-weight: 300;
`;
const Divcontainer2 = styled.div`
  position: absolute;
  top: 98px;
  left: 20px;
  width: 153.56px;
  font-size: 12px;
  height: 101px;
`;
const Divcontainer = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
  height: 200px;
  background-color: var(--purple);
  color: var(--color-white);
  font-family: var(--font-noto-sans-kr);
`;

const FooterContainer = styled.div`
  background-color: var(--purple);
  width: 100%;
  height: 200px;
  color: var(--color-white);
  font-family: var(--font-noto-sans-kr);
  margin-top: auto;
`;

const Footer: FunctionComponent = () => {
  const location = useLocation();
  const initialAnimationState = () => {
    if (location.pathname === '/auth') {
      return 'none';
    }
    return 'fadeIn';
  };
  const [animation, setAnimation] = useState(initialAnimationState);

  useEffect(() => {
    if (location.pathname === '/auth' && animation === 'fadeIn') {
      setTimeout(() => setAnimation('none'), 300);
      setAnimation('fadeOut');
      return;
    }
    if (location.pathname !== '/auth') {
      setTimeout(() => setAnimation('fadeIn'), 300);
      return;
    }
  }, [location]);

  return (
    <FooterContainer className={`${animation}`}>
      <Divcontainer>
        <DivfooterText2>
          <Item1>22팀 | 메인프로젝트 화이팅</Item1>
          <Item2>대표자: 김준표 | 그 외 5 인 | 🥲🥲🥲</Item2>
          <CopyrightBuyteAll>Copyright© buyte. All Rights Reserved.</CopyrightBuyteAll>
          <Item3>이용약관 | 개인정보처리방침 | 1:1 문의</Item3>
        </DivfooterText2>
        <Buyte>BUYTE</Buyte>
        <Divcontainer2>
          <Item4>(주) BUYTE</Item4>
          <Item5>010-1234-1234</Item5>
          <Item6>서비스 시간: 09:00 ~ 18:00</Item6>
        </Divcontainer2>
      </Divcontainer>
    </FooterContainer>
  );
};

export default Footer;
