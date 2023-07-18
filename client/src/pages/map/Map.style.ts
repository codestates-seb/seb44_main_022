import styled from 'styled-components';
import { BsCircle } from 'react-icons/bs';
import { fadeIn, fadeOut, fadeUpNone } from '../../styles/keyframes';

export const MapPageContainer = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 80vh;
  padding-top: 2rem;
`;

export const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 80%;
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

  @media screen and (max-height: 950px) {
    animation: ${fadeUpNone} 0.3s forwards;
  }
`;

export const ImageCarouselButton = styled(BsCircle)<{ imageNumber: number; currentNumber: number }>`
  transition: 0.3s;
  color: var(--purple);
  border-radius: 50%;
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
  color: var(--dark-gray);

  &:hover {
    transform: scale(110%, 110%);
    color: var(--purple);
  }
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
  font-size: 14px;
  font-weight: bold;
  color: var(--dark-gray);
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: var(--light-gray);
  }
`;

export const MapPageIntroduce = styled.div`
  width: 80%;
  padding: 1rem 2rem 2rem 2rem;
  font-family: Yaldevi; sans-serif;
  font-size: 1.25rem;
  color: var(--dark-gray);
`;
