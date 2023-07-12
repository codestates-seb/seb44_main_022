import styled, { css } from 'styled-components';

export const CartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 70%;
  margin: 11rem auto 10rem auto;
  min-width: 500px;
  height: auto;

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

export const CartCategoryContainer = styled.div`
  position: relative;
  display: flex;
`;

export const CartCategory = styled.div<{ location: boolean }>`
  padding-left: 1rem;
  ${({ location }) =>
    location &&
    css`
      font-weight: bold;
    `}
`;

export const CartCategoryArrow = styled.div`
  position: absolute;
  top: 0;
  right: -20px;
`;

export const CartListName = styled.div<{ grow: number; minWidth?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
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

export const EmptyCartListBox = styled.div`
  border-bottom: 1px solid gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;

export const TotalPaymentContainer = styled.div`
  margin: 2rem 0;
  border-top: 2px solid gray;
  border-bottom: 1px solid gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3.5rem 0;
`;

export const CartCategoryName = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
`;
