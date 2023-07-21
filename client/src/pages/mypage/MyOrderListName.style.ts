import styled, { css } from 'styled-components';

const mediaQuery = (maxWidth: number) => css`
  @media (max-width: ${maxWidth}px) {
    display: none;
  }
`;

export const MyOrderListName = styled.div<{ grow?: number, minWidth?: number} >`
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
  font-family: 'Yaldevi', sans-serif;
  font-weight: bold;

  ${({ minWidth }) => (minWidth ? mediaQuery(minWidth) : null)};
`;

export const CartImage = styled.img`
  width: 3rem;
  height: 3rem;
  object-fit: cover;
`;

