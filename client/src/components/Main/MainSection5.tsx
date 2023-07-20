import styled from 'styled-components';
import section5_1 from '../../assets/images/img_main/section5_1.jpg';
import section5_2 from '../../assets/images/img_main/section5_2.jpg';
const Section3Icon = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const Section3Card = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: 0.4s;
  transform-style: preserve-3d;

  .back {
    background: royalblue;
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

function MainSection5({ id, className }: { id: string; className?: string }) {
  return (
    <div className="section">
      <Section3 id={id} className={`section5 ${className}`}>
        <Section3Card className="card">
          <Section3Icon className="front" src={section5_1} />
          <Section3Icon className="back" src={section5_2} />
        </Section3Card>
      </Section3>
    </div>
  );
}

export default MainSection5;
