import { BsCircle } from 'react-icons/bs';
import styled from 'styled-components';

export const MapModalImgContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 310px;
  margin-top: 1.5rem;
`;

export const ImageCarouselButton = styled(BsCircle)<{ imageNumber: number; currentNumber: number }>`
  transition: 0.3s;
  color: var(--purple);
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;

  ${({ imageNumber, currentNumber }) =>
    imageNumber === currentNumber ? 'background-color: var(--purple)' : 'cursor: pointer'};
  &:hover {
    opacity: 0.7;
  }
`;

export const ExitMapModalButton = styled.div`
  position: absolute;
  right: 5%;
  cursor: pointer;
  top: 2%;
  font-size: 1.5rem;
  font-family: Just Another Hand, cursive;
  transition: 0.3s;

  &:hover {
    transform: scale(110%, 110%);
  }
`;

export const MapModalTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 2rem;
  padding-top: 2.5rem;
`;

export const MapModalStoreInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1.25rem;
`;

export const MapModalAddressContainer = styled.div`
  font-size: 12px;
  font-weight: normal;
  color: gray;
  padding-top: 6px;
`;

export const MapModalStoreImg = styled.img`
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: scale(1.2, 1.2);
    opacity: 0.7;
  }
`;

export const MapModalStoreName = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: var(--dark-gray);
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: var(--light-gray);
  }
`;

export const MapModalImgBox = styled.div`
  overflow: hidden;
  width: 80%;
  height: 100%;
  border-radius: 28px;
  box-shadow: 1px 1px 3px 1px var(--light-gray);
  background-color: var(--background);
`;

export const ImageCarouselButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  column-gap: 1rem;
  margin-top: 1.75rem;
`;

export const MapModalImg = styled.div<{ currentNumber: number }>`
  display: flex;
  transform: translateX(-${({ currentNumber }) => currentNumber * 246.5}px);
  transition: 0.3s;
  height: 80%;
  padding: 1rem 1rem 0 1rem;
`;
