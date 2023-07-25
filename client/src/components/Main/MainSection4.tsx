import styled from 'styled-components';
import { css } from 'styled-components';
import section4_1 from '../../assets/images/img_main/section4_1.png';
import section4_2 from '../../assets/images/img_main/section4_2.png';
import { appearAndSlideUp, slideUpText } from '../../styles/keyframes';

const SectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  scroll-snap-align: start;
  height: 100vh;
`;

const HalfContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  height: 84px;
  background-color: rgba(255, 255, 255, 0.1);
`;

const ColorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
`;
const Image = styled.img<{ isActive: boolean }>`
  max-width: 50%;
  max-height: 50%;
  width: auto;
  height: auto;
  border-radius: 20px;
  opacity: 0;
  animation: ${(props) =>
    props.isActive
      ? css`
          ${appearAndSlideUp} 3s
        `
      : 'none'};
  animation-fill-mode: forwards;
`;

const Text = styled.div<{ isActive: boolean }>`
  animation: ${(props) =>
    props.isActive
      ? css`
          ${slideUpText} 1s ease-in-out;
          animation-delay: 3s;
        `
      : 'none'};
  animation-fill-mode: backwards;
`;
const PinkContainer = styled(ColorContainer)`
  background-color: #ffa299;
`;

const PurpleContainer = styled(ColorContainer)`
  background-color: #7771d5;
`;

function MainSection4({
  id,
  className,
  isActive,
}: {
  id: string;
  className?: string;
  isActive: boolean;
}) {
  return (
    <SectionContainer id={id} className={`section4 ${className}`}>
      <HalfContainer>
        <Header />
        <PinkContainer>
          <Image src={section4_1} alt="section4_1" isActive={isActive} />
          <Text isActive={isActive}>
            <div
              style={{ color: 'white', fontSize: '30px', fontFamily: 'BMJUA', margin: '20px 0' }}
            >
              매장 리스트
            </div>
            <div
              style={{
                color: 'white',
                fontSize: '18px',
                fontFamily: 'BMJUA',
                margin: '10px 0',
                lineHeight: '1.5',
              }}
            >
              BUYTE에 입점된 매장들을 확인해보세요 <br /> 매장을 먼저 선택하고 제공하는 디자인대로
              원하는대로 커스텀할 수 있습니다. <br /> 제공한 옵션 외에도 사진을 준비해서 같이
              올려주셔도 좋아요
            </div>
          </Text>
        </PinkContainer>
      </HalfContainer>
      <HalfContainer>
        <Header />
        <PurpleContainer>
          <Image src={section4_2} alt="section4_2" isActive={isActive} />
          <Text isActive={isActive}>
            <div
              style={{ color: 'white', fontSize: '30px', fontFamily: 'BMJUA', margin: '20px 0' }}
            >
              추천 메뉴
            </div>
            <div
              style={{
                color: 'white',
                fontSize: '18px',
                fontFamily: 'BMJUA',
                margin: '10px 0',
                lineHeight: '1.5',
              }}
            >
              커스텀을 원하지 않으시거나 편하게 주문하고 싶으시면
              <br /> 추천 메뉴 리스트를 확인해주세요
              <br /> 가장 인기있는 메뉴들을 알려드려요
            </div>
          </Text>
        </PurpleContainer>
      </HalfContainer>
    </SectionContainer>
  );
}

export default MainSection4;
