import { TransitionStatus } from 'react-transition-group';
import styled, { css, keyframes } from 'styled-components';
const fadeIn = keyframes`
  0% {
    opacity: 0;
    visibility: hidden;
  }
  100% {
    opacity: 1;
    visibility: visible;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
    visibility: visible;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
`;
type PopupContainerProps = {
  show: boolean;
  state: TransitionStatus;
};
export const PopupContainer = styled.div<PopupContainerProps>`
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 40%;
  left: 60%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  display: block;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
  width: 60%;
  height: 50%;
  @media (max-width: 900px) {
    flex-direction: column;
  }

  ${({ state }) => {
    switch (state) {
      case 'entering':
        return css`
          animation: ${fadeIn} 0.3s linear forwards;
        `;
      case 'exiting':
        return css`
          animation: ${fadeOut} 0.3s linear forwards;
        `;
      default:
        return '';
    }
  }};
`;
