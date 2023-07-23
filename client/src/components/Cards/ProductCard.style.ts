import styled from 'styled-components';

export const ProductContainer = styled.ul`
  margin-top: 1rem;
  margin-bottom: 7rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  grid-gap: 12px;
  justify-items: center;
  align-items: center;
  grid-row-gap: 4rem;
`;
export const ProductTitle = styled.p`
  font-size: 165x;
  text-align: center;
  margin-top: 0.4rem;
  font-weight: 800;
  color: var(--dark-gray);
  line-height: 1.2;
`;

export const ProductImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  cursor: pointer;
`;
export const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
  li:hover & {
    opacity: 1;
  }
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ProductPrice = styled.p`
font-size: 14px;
color:var(--light-gray);
line-height: 1.3;
font-family: 'Yaldevi';
text-align: center;
font-weight: 600;`