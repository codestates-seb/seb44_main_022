import styled, { css } from 'styled-components';
import loginImage from '../../../assets/images/loginImage.png';

export const AuthContainer = styled.div`
  display: flex;
  height: 100vh;
  @media screen and (max-width: 840px) {
    flex-direction: column;
  }
`;

export const AuthImage = styled.div`
  background-image: url(${loginImage});
  flex-grow: 1;
  width: auto;
  height: auto;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  @media screen and (max-width: 840px) {
    flex-grow: 0.2;
  }
`;

export const AuthContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AuthCategory = styled.div<{ isSignUp: boolean; types: string }>`
  color: var(--bright-black);
  opacity: ${({ isSignUp, types }) =>
    types === 'login' ? (isSignUp ? css`0.6` : css`1`) : isSignUp ? css`1` : css`0.6`};
  cursor: pointer;
`;
