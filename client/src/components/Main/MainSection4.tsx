import styled from 'styled-components';

const SectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #fff4e4;
  width: 100%;
  height: 100vh;
`;

function MainSection4({ id }: { id: string }) {
  return <SectionContainer id={id} className="section4"></SectionContainer>;
}

export default MainSection4;
