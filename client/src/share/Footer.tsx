import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import github from '../assets/images/github.png';
import notion from '../assets/images/notion.png';
import youtube from '../assets/images/youtube.png';
import { BASE_ANIMATION_TIME } from '../assets/constantValue/constantValue';
const FooterContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--purple);
  width: 100%;
  color: var(--color-white);
  font-family: var(--font-noto-sans-kr);
  margin-top: auto;
`;
const FooterInfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 40%;
  margin-bottom: 8px;
`;
const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 70px;
`;

const RightInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 12%;
`;

function Footer() {
  const location = useLocation();
  const initialAnimationState = () => {
    if (location.pathname === '/auth') {
      return 'none';
    }
    return 'fadeIn';
  };
  const [animation, setAnimation] = useState(initialAnimationState);

  useEffect(() => {
    if ((location.pathname === '/auth' || location.pathname === '/') && animation === 'fadeIn') {
      setTimeout(() => setAnimation('none'), BASE_ANIMATION_TIME);
      setAnimation('fadeOut');
      return;
    }
    if (location.pathname !== '/auth' && location.pathname !== '/') {
      setTimeout(() => setAnimation('fadeIn'), BASE_ANIMATION_TIME);
      return;
    }
  }, [location]);

  return (
    <FooterContainer className={`${animation}`}>
      <div
        style={{
          fontSize: '41px',
          color: 'var(--white)',
          lineHeight: '60px',
          fontFamily: "'Just Another Hand', cursive",
          marginBottom: '3px',
          marginTop: '7px',
          fontWeight: 'bold',
        }}
      >
        BUYTE
      </div>
      <FooterInfoContainer>
        <InfoBlock>
          <div
            style={{ color: 'white', marginBottom: '10px', fontWeight: 'bold', fontSize: '19px' }}
          >
            (주) BUYTE
          </div>
          <div style={{ color: 'white', fontSize: '15px' }}>010-1234-1234</div>
        </InfoBlock>
        <RightInfoBlock>
          <div style={{ color: 'white', marginBottom: '3px', fontSize: '14px' }}>
            22팀 | BUYTE 팀 메인프로젝트{' '}
          </div>
          <div style={{ color: 'white', marginBottom: '3px', fontSize: '14px' }}>
            FE : 김준표 | 민정호 | 양효정{' '}
          </div>
          <div style={{ color: 'white', fontSize: '14px' }}>BE : 김현우 | 오숙현 | 이준기</div>
        </RightInfoBlock>
      </FooterInfoContainer>

      <ImageContainer>
        <a href="https://github.com/codestates-seb/seb44_main_022">
          <img
            src={github}
            alt="GitHub"
            style={{ width: '32px', height: '32px', cursor: 'pointer' }}
          />
        </a>
        <img
          src={notion}
          alt="Notion"
          style={{ width: '32px', height: '32px', cursor: 'pointer' }}
        />
        <img
          src={youtube}
          alt="YouTube"
          style={{ width: '38px', height: '38px', cursor: 'pointer' }}
        />
      </ImageContainer>
    </FooterContainer>
  );
}

export default Footer;
