import styled from 'styled-components';
import cake1 from '../../assets/images/img_main/cake1.png';

const SectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ffb7b0;
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
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

function MainSection3({ id, className }: { id: string; className?: string }) {
  return (
    <SectionContainer id={id} className={`section3 ${className}`}>
      <TextContainer>텍스트를</TextContainer>
      <ImageContainer>
        <Image src={cake1} alt="Custom Cake" />
      </ImageContainer>
    </SectionContainer>
  );
}

export default MainSection3;
