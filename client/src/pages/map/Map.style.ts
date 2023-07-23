import styled from 'styled-components';
import { fadeIn, fadeOut, fadeUpNone } from '../../styles/keyframes';

export const MapPageContainer = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 90vh;
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
  width: 350px;
  height: 530px;
  background-color: var(--gray);
  border-radius: 15px;
  border: 1px solid var(--normal-gray);
  bottom: calc(35% - 10vh);
  right: 15%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: ${({ isClose }) => (isClose ? fadeOut : fadeIn)} 0.3s forwards;
  box-shadow: 1px 1px 5px 1px var(--light-gray);
  font-family: BMJUA;

  @media screen and (max-height: 600px) {
    animation: ${fadeUpNone} 0.3s forwards;
  }
`;

export const MapPageIntroduce = styled.div`
  width: 80%;
  padding: 1rem 2rem 2rem 2rem;
  font-family: BMJUA;
  font-size: 2rem;
  color: var(--light-black);
`;
