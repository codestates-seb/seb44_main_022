import { keyframes } from 'styled-components';

export const dropDown = keyframes`
  0% {
    transform: scaleY(0);
    opacity: 0;
    transform-origin: top;
  }
  80% {
    transform: scaleY(1.1);
    opacity: 1;
  }
  100% {
    transform: scaleY(1);
    opacity: 1;
    transform-origin: top;
  }
`;

export const dropUp = keyframes`
  0% {
   transform: scaleY(1);
    opacity: 1;
    transform-origin: top;
  }
  100% {
    transform: scaleY(0);
    opacity: 0;
    transform-origin: top;
  }
`;

export const fadeNone = keyframes`
  0% {
    transform: translate(0px, 0px);
    opacity: 1;
    visibility: visible;
  }
  100% {
    transform: translate(-400px, 0);
    opacity: 0;
    visibility: hidden;
  }
`;

export const fadeUpNone = keyframes`
  0% {
    transform: translate(0px, 0px);
    opacity: 1;
    visibility: visible;
  }
  100% {
    transform: translate(0px, -40px);
    opacity: 0;
    visibility: hidden;
  }
`;

export const fadeDown = keyframes`
  0% {
    transform: translate(0px, 0px);
    opacity: 0;
    visibility: hidden;
  }
  100% {
    transform: translate(0px, 40px);
    visibility: visible;
    opacity: 1;
  }
`;

export const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translate(-40px, 0);
    visibility: hidden;
  }
  100% {
    visibility: visible;
    opacity: 1;
    transform: translate(0px, 0px);
  }
`;

export const fadeOut = keyframes`
  0% {
    visibility: visible;
    opacity: 1;
    transform: translate(0px, 0px);
  }
  100% {
    transform: translate(40px, 0);
    opacity: 0;
    visibility: hidden;
  }
`;
