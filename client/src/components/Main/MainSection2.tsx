import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import customCake1 from '../../assets/images/img_main/customCake1.png';
import customCake2 from '../../assets/images/img_main/customCake2.png';

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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #fff4e4;
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  gap: 60px;
`;

const Image = styled.img`
  position: absolute;
  max-width: 80%;
  height: auto;
  transition: opacity 0.5s ease-in-out;
  cursor: pointer;
  &:hover {
    cursor: pointer;
  }
`;
const ImageContainer = styled.div<{ isAnimated: boolean }>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-left: 12%;
  position: relative;
  animation: ${slideInLeft} 1s ease-out;
  animation-play-state: ${({ isAnimated }) => (isAnimated ? 'running' : 'paused')};
`;
const TextContainer = styled.div<{ isAnimated: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 70px;
  font-size: 3rem;
  color: #ffffff;
  font-family: 'BMJUA';
  align-items: flex-start;
  animation: ${slideInRight} 1s ease-out;
  animation-play-state: ${({ isAnimated }) => (isAnimated ? 'running' : 'paused')};
`;
function MainSection2({
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

  const handleMouseEnter = () => {
    setImageOneVisible(false);
  };

  const handleMouseLeave = () => {
    setImageOneVisible(true);
  };
  return (
    <SectionContainer id={id} className={`section2 ${className}`}>
      <ImageContainer
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        isAnimated={isAnimated}
      >
        <Image src={customCake1} alt="Custom Cake" style={{ opacity: isImageOneVisible ? 1 : 0 }} />
        <Image src={customCake2} alt="Custom Cake" style={{ opacity: isImageOneVisible ? 0 : 1 }} />
      </ImageContainer>
      <TextContainer isAnimated={isAnimated}>
        <div style={{ color: '#a08a74', fontSize: '22px', marginBottom: '40px' }}>
          BUYTE에서 주문할 수 있는 커스텀 제품
        </div>
        <div
          style={{ color: '#826d58', fontSize: '42px', fontWeight: 'bold', marginBottom: '70px' }}
        >
          케이크 도넛 쿠키
        </div>
        <div style={{ color: '#826d58', fontSize: '22px' }}>
          <div style={{ color: '#826d58', marginBottom: '12px' }}>
            ✔︎ 매장별 재료에 따라 원하는대로 커스텀 가능
          </div>
          <div style={{ color: '#826d58', marginBottom: '12px' }}>
            ✔︎ 원하는 디자인을 만들어주세요
          </div>
          <div style={{ color: '#826d58', marginBottom: '12px' }}>
            ✔︎ 가까운 매장을 찾아서 주문해주세요
          </div>
          <div style={{ color: '#826d58', marginBottom: '12px' }}>✔︎ 주문 배송 가능</div>
        </div>
      </TextContainer>
    </SectionContainer>
  );
}

export default MainSection2;
