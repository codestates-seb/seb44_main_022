import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import cake1 from '../../assets/images/img_main/cake1.png';
import cake2 from '../../assets/images/img_main/cake2.png';

const slideInLeft = keyframes`
  from {
    transform: translateX(-20%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInRight = keyframes`
  from {
    transform: translateX(20%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  background-color: #ffa299;
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  gap: -50px;
`;

const Image = styled.img`
  position: absolute;
  width: 400px;
  height: 400px;
  transition: opacity 0.5s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;
const ImageContainer = styled.div<{ isAnimated: boolean }>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-right: 15%;
  position: relative;
  animation: ${slideInRight} 1s ease-out;
  animation-play-state: ${({ isAnimated }) => (isAnimated ? 'running' : 'paused')};
`;

const TextContainer = styled.div<{ isAnimated: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 23%;
  margin-top: 70px;
  font-size: 3rem;
  color: #ffffff;
  font-family: 'BMJUA';
  align-items: flex-start;
  animation: ${slideInLeft} 1s ease-out;
  animation-play-state: ${({ isAnimated }) => (isAnimated ? 'running' : 'paused')};
`;
function MainSection3({
  id,
  className,
  isActive,
}: {
  id: string;
  className?: string;
  isActive: boolean;
}) {
  const [isImageOneVisible, setImageOneVisible] = useState(true);
  const [isAnimated, setAnimated] = useState(false);
  useEffect(() => {
    if (isActive) {
      setAnimated(true);
    } else {
      setAnimated(false);
    }
  }, [isActive]);
  const handleImageClick = () => {
    setImageOneVisible(!isImageOneVisible);
  };

  return (
    <SectionContainer id={id} className={`section2 ${className}`}>
      <ImageContainer onClick={handleImageClick} isAnimated={isAnimated}>
        <Image src={cake1} alt="Custom Cake" style={{ opacity: isImageOneVisible ? 1 : 0 }} />
        <Image src={cake2} alt="Custom Cake" style={{ opacity: isImageOneVisible ? 0 : 1 }} />
      </ImageContainer>
      <TextContainer isAnimated={isAnimated}>
        <div style={{ color: '#fff6f6', fontSize: '22px', marginBottom: '40px' }}>
          BUYTE에서 주문할 수 있는 매장내 인기제품
        </div>
        <div
          style={{ color: '#fff6f6', fontSize: '42px', fontWeight: 'bold', marginBottom: '70px' }}
        >
          케이크 도넛 쿠키
        </div>
        <div style={{ color: '#ffffff', fontSize: '22px' }}>
          <div style={{ color: '#ffffff', marginBottom: '12px' }}>
            ✔︎ 직접 커스텀하기 어려우신분들을 위해
          </div>
          <div style={{ color: '#ffffff', marginBottom: '12px' }}>
            ✔︎ 원하는 디자인을 골라보세요
          </div>
          <div style={{ color: '#ffffff', marginBottom: '12px' }}>
            ✔︎ 가까운 매장을 찾아서 주문해주세요
          </div>
          <div style={{ color: '#ffffff', marginBottom: '12px' }}>✔︎ 주문 배송 가능</div>
        </div>
      </TextContainer>
    </SectionContainer>
  );
}

export default MainSection3;
