import styled from 'styled-components';
import { fadeInCenter } from '../../styles/keyframes';

export const ChattingOpenButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 2;
  right: 1rem;
  bottom: 1rem;
  width: 4rem;
  height: 4rem;
  background-color: white;
  border-radius: 28px;
  overflow: hidden;
  font-size: 3rem;
  opacity: 0;
  box-shadow: 1px 1px 5px 1px var(--light-gray);
  animation: 0.3s ${fadeInCenter} 0.5s forwards;
  transform-origin: center;
`;

export const ChattingPostButton = styled.button`
  position: absolute;
  bottom: 22px;
  right: 6px;
  border-radius: 50%;
  border: none;
  overflow: hidden;
  box-shadow: 1px 1px 5px 1px var(--light-gray);

  transition: 0.3s;

  &:hover {
    transform: scale(1.2, 1.2);
  }

  &:active {
    transform: scale(1, 1);
  }
`;
