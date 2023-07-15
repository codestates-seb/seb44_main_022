import styled from 'styled-components';
import { BsCircle } from 'react-icons/bs';
import { fadeIn, fadeNone, fadeOut, fadeUpNone } from '../../styles/keyframes';

export const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 80%;
  min-height: 500px;
  margin-bottom: 2rem;
`;

export const MarkerModal = styled.div<{ isClose: boolean }>`
  position: absolute;
  z-index: 10;
  width: 330px;
  height: 500px;
  background-color: var(--background);
  border-radius: 15px;
  border: 1px solid var(--normal-gray);
  top: 25%;
  right: 15%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: ${({ isClose }) => (isClose ? fadeOut : fadeIn)} 0.3s forwards;
  box-shadow: 1px 1px 5px 1px var(--light-gray);
  @media screen and (max-width: 1000px) {
    animation: ${fadeNone} 0.3s forwards;
  }
  @media screen and (max-height: 950px) {
    animation: ${fadeUpNone} 0.3s forwards;
  }
`;

export const ImageCarouselButton = styled(BsCircle)<{ imageNumber: number; currentNumber: number }>`
  transition: 0.3s;
  color: var(--purple);
  border-radius: 50%;
  ${({ imageNumber, currentNumber }) =>
    imageNumber === currentNumber && 'background-color: var(--purple)'};
`;

export const ExitMapModalButton = styled.div`
  position: absolute;
  right: 5%;
  cursor: pointer;
  top: 2%;
  font-size: 1.5rem;
  font-family: Just Another Hand, cursive;
`;

export const MapModalTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 2rem;
  padding-top: 2rem;
`;

export const MapModalStoreInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1.25rem;
`;

export const MapModalAddressContainer = styled.div`
  font-size: 10px;
  font-weight: normal;
  color: gray;
  padding-top: 6px;
`;
