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

export const fadeInCenter = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5, 0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1, 1);
  }
`;

export const sliceUp = keyframes`
  0% {
    opacity: 0;
    transform: scaleY(0);
  }
  100% {
    opacity: 1;
    transform: scaleY(1);
  }
`;
export const errFadeIn = keyframes`
  0% {
    opacity: 0;
    height: 0;
  }
  10% {
    height: auto;
  }
  100% {
    opacity: 1;
  }
`;

export const errFadeOut = keyframes`
  0% {
    opacity: 1;
    height: auto;
  }
  70% {
    height: auto;
  }
  100% {
    opacity: 0;
    height: 0;
  }
`;
export const appearAndSlideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20vh);
  }
  50% {
    opacity: 1;
    transform: translateY(20vh);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const slideUpText = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
export const wiggle = keyframes`
  0% { transform: rotate(0deg); }
  10% { transform: rotate(-1.5deg); }
  20% { transform: rotate(1deg); }
  30% { transform: rotate(-1.5deg); }
  40% { transform: rotate(1deg); }
  50% { transform: rotate(-1.5deg); }
  60% { transform: rotate(1deg); }
  70% { transform: rotate(-1.5deg); }
  80% { transform: rotate(1deg); }
  90% { transform: rotate(-1.5deg); }
  100% { transform: rotate(0deg); }
`;
