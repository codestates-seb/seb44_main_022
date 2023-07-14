import styled, { keyframes } from 'styled-components';

interface reverseProps {
  reverse: boolean;
}

const AboutFlow = ({ reverse }: reverseProps) => {
  return (
    <FlowBox>
      <FlowWrap>
        <Flow reverse={reverse}>
          <span>BUYTE</span>
          <span>BUYTE</span>
          <span>BUYTE</span>
          <span>BUYTE</span>
          <span>BUYTE</span>
          <span>BUYTE</span>
          <span>BUYTE</span>
          <span>BUYTE</span>
          <span>BUYTE</span>
          <span>BUYTE</span>
          <span>BUYTE</span>
          <span>BUYTE</span>
          <span>BUYTE</span>
          <span>BUYTE</span>
        </Flow>
      </FlowWrap>
    </FlowBox>
  );
};
export default AboutFlow;

const flowing = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
`;

const reverseFlowing = keyframes`
  0% {
    transform: translate3d(-50%, 0, 0);
  }
  100% {
    transform: translate3d(0%, 0, 0);
  }
`;

const FlowBox = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-bottom: 1rem;
  padding-top: 1rem;
`;

const FlowWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  white-space: nowrap;
`;

const Flow = styled.div<{ reverse: boolean }>`
  font-size: 20px;
  animation: ${({ reverse }) => (reverse ? flowing : reverseFlowing)} 3s linear infinite;
  span {
    display: inline-block;
    font-family: Just Another Hand, cursive;
    padding: 0 3px;
  }
`;
