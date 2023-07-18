import styled, { css, keyframes } from 'styled-components';

export const UserInputWrapper = styled.div`
  position: relative;
`;

export const InputBox = styled.input<{ valid?: boolean }>`
  display: block;
  border-radius: 12px;
  width: 300px;
  border: 1px solid transparent;
  background-color: var(--gray);
  margin: 0.2rem 0;
  padding: 1rem 0 1rem 2.5rem;
  color: var(--dark-gray);
  ::placeholder {
    color: var(--bright-black);
  }
  ${({ valid }) => valid && 'border-color: red'}
`;

export const Icons = styled.div`
  position: absolute;
  width: 1.35rem;
  height: 1.35rem;
  display: flex;
  align-items: center;
  top: 50%;
  left: 1.5rem;
  transform: translate(-50%, -50%);
  color: var(--light-gray);
`;

export const fadeIn = keyframes`
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

export const fadeOut = keyframes`
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

export const ErrorBox = styled.div<{ animate: boolean; isChanged: boolean | null }>`
  color: red;
  margin: 0.25rem 0;
  padding: 0 0.25rem;
  width: 300px;
  word-break: keep-all;
  font-size: 14px;
  display: ${({ isChanged }) => (isChanged === null ? 'none' : 'block')};
  ${({ animate, isChanged }) =>
    isChanged !== null &&
    css`
      animation: ${animate
          ? css`
              ${fadeIn}
            `
          : css`
              ${fadeOut}
            `}
        0.3s forwards;
    `};
`;
