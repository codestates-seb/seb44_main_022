import styled from 'styled-components';

export const StoreMenuInfo = styled.div`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.3);
  width: 100%;
  height: 100%;
  bottom: 0;
  opacity: 0;
  cursor: pointer;
  transition: all 1s;
`;

export const CardListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  grid-gap: 1rem;
  justify-content: center;
  grid-row-gap: 4rem;
`;

export const Cards = styled.li`
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 200px;
  height: 320px;
  overflow: hidden;
  &:hover {
    ${StoreMenuInfo} {
      opacity: 1;
      cursor: pointer;
    }
    img {
      transform: scale(1.05);
      transition: all 1s;
    }
  }
  &:not(:hover) {
    img {
      transform: scale(1);
      transition: all 1s;
    }
  }
`;

export const StoreTitleInfo = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: var(--background);
  padding: 15px 0;
  font-weight: 800;
  text-align: center;
`;
