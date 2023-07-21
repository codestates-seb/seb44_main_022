import styled from 'styled-components';
import section5_1 from '../../assets/images/img_main/section5_1.jpg';
import section5_2 from '../../assets/images/img_main/section5_2.jpg';
import section5_3 from '../../assets/images/img_main/section5_3.jpg';
import section5_4 from '../../assets/images/img_main/section5_4.jpg';
import section5_5 from '../../assets/images/img_main/section5_5.jpg';
import section5_6 from '../../assets/images/img_main/section5_6.jpg';
import cake1 from '../../assets/images/img_main/cake1.png';

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff4e4;
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  gap: 60px;
`;

const ReviewText = styled.div`
  position: absolute;
  left: 5%;
  top: 30%;
  font-family: 'BMJUA';
  transform: translateY(-50%);
  color: #826d58;
  font-size: 6rem;
`;
const ReviewUnderline = styled.div`
  position: absolute;
  left: 17%;
  top: 37%;
  height: 6px;
  width: 10%;
  background: rgba(130, 110, 86, 0.3);
`;
const ImagesContainer1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 50px;
  margin-left: 20%;
`;

const ImagesContainer2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 50px;
  margin-left: 30%;
`;

const images1 = [
  { front: section5_1, back: cake1 },
  { front: section5_2, back: cake1 },
  { front: section5_3, back: cake1 },
];

const images2 = [
  { front: section5_4, back: cake1 },
  { front: section5_5, back: cake1 },
  { front: section5_6, back: cake1 },
];

const Section3Icon = styled.img`
  position: absolute;
  width: 120%;
  height: 110%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: #fff;

  &.back {
    transform: rotateY(180deg);
    right: 0;
  }
`;

const Section3Card = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: 0.4s;
  transform-style: preserve-3d;

  .back {
    transform: rotateY(180deg);
  }
`;

const Section3 = styled.div`
  width: 200px;
  height: 250px;
  position: relative;
  perspective: 1100px;
  scroll-snap-align: start;
  margin: 2rem;

  &:hover ${Section3Card} {
    transform: rotateY(180deg);
  }
`;

const Section3_1 = styled(Section3)`
  &:hover ${Section3Card} {
    transform: rotateY(-180deg);
  }
`;

const Section3_2Card = styled(Section3Card)`
  transform-origin: center;

  .back {
    transform: rotateY(-180deg);
  }
`;

const Section3_2 = styled(Section3)`
  &:hover ${Section3_2Card} {
    transform: rotateY(-180deg);
  }
`;

function MainSection5({ id, className }: { id: string; className?: string }) {
  return (
    <SectionContainer className="section">
      <ReviewText>REVIEWS</ReviewText>
      <ReviewUnderline />
      <ImagesContainer1>
        {images1.map((image, index) => (
          <Section3_1 key={index} id={id} className={`section5 ${className}`}>
            <Section3Card className="card">
              <Section3Icon className="front" src={image.front} />
              <Section3Icon className="back" src={image.back} />
            </Section3Card>
          </Section3_1>
        ))}
      </ImagesContainer1>
      <ImagesContainer2>
        {images2.map((image, index) => (
          <Section3_2 key={index} id={id} className={`section5 ${className}`}>
            <Section3_2Card className="card">
              <Section3Icon className="front" src={image.front} />
              <Section3Icon className="back" src={image.back} />
            </Section3_2Card>
          </Section3_2>
        ))}
      </ImagesContainer2>
    </SectionContainer>
  );
}

export default MainSection5;
