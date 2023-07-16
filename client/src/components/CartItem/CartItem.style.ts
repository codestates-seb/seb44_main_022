import styled, { css } from 'styled-components';

export const CartListName = styled.div<{ grow: number; minWidth?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--normal-gray);
  padding: 1rem;
  color: var(--dark-blue-black);
  width: ${({ grow }) =>
    css`
      ${grow}%
    `};

  min-width: ${({ minWidth }) =>
    minWidth
      ? css`
          ${minWidth}px
        `
      : css`120px`};
`;

export const CartImage = styled.img`
  width: 3rem;
  height: 3rem;
  object-fit: cover;
`;
