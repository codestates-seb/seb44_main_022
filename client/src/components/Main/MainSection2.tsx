import styled from 'styled-components';
import customCake1 from '../../assets/images/img_main/customCake1.png'; // 이미지 확장자 추가
import customCake2 from '../../assets/images/img_main/customCake2.png';

const SectionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff4e4;
  width: 100%;
  height: 100%;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${customCake1});
  background-size: contain;
  background-repeat: no-repeat;
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: #ffffff;
`;

function MainSection2() {
  return (
    <SectionContainer className="section">
      <ImageContainer />
      <TextContainer>여기에 텍스트를 쓰세요</TextContainer>
    </SectionContainer>
  );
}

export default MainSection2;
