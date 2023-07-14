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
  padding: 1rem;
  width: 150px;
  text-align: center;
  border-bottom: ${({ isSignUp, types }) =>
    types === 'login'
      ? isSignUp
        ? css`2px solid var(--normal-gray)`
        : css`2px solid var(--bright-black)`
      : isSignUp
      ? css`2px solid var(--bright-black)`
      : css`2px solid var(--normal-gray)`};
`;

export const LinkText = styled.a`
  color: var(--bright-black);
  font-size: 14px;
  display: flex;
  justify-content: center;
  text-decoration-line: underline;
`;

export const AuthForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
`;

export const AuthCategoryContainer = styled.div`
  margin-top: 100px;
  display: flex;
  width: 300px;
  margin: 1.5rem 0;
  justify-content: space-around;
`;