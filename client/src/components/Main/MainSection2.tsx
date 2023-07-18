import styled from 'styled-components';
import customCake1 from '../../assets/images/img_main/customCake1.png';

const SectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #fff4e4;
  width: 100%;
  height: 100vh;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: #ffffff;
`;

function MainSection2({ id }: { id: string }) {
  return (
    <SectionContainer id={id} className="section3">
      <ImageContainer>
        <Image src={customCake1} alt="Custom Cake" />
      </ImageContainer>
      <TextContainer>택스트</TextContainer>
    </SectionContainer>
  );
}

export default MainSection2;