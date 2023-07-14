import styled, { keyframes } from 'styled-components';
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;
export const PopupContainer = styled.div<{ show: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
  opacity: ${(props) => (props.show ? 1 : 0)};
  animation-name: ${(props) => (props.show ? fadeIn : fadeOut)};
  animation-fill-mode: forwards; /* Retains the styles of the last keyframe after the animation ends */
  width: 60%;
  height: 50%;

  @media (max-width: 908px) {
    flex-direction: column;
  }
`;
