import styled from 'styled-components';

const SectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #fff4e4;
  width: 100%;
  scroll-snap-align: start;
  height: 100vh;
`;

function MainSection4({ id, className }: { id: string; className?: string }) {
  return <SectionContainer id={id} className={`section4 ${className}`}></SectionContainer>;
}

export default MainSection4;
