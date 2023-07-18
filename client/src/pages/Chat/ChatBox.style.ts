import styled from 'styled-components';
import { CHAT_TYPE_STYLE } from '../../assets/constantValue/constantValue';

export const ChattingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  z-index: 2;
  right: 1rem;
  bottom: 1rem;
  width: 22rem;
  height: 40rem;
  background-color: white;
  border-radius: 36px;
  overflow-y: auto;
  font-size: 3rem;
  box-shadow: 1px 1px 5px 1px var(--light-gray);
  animation: 0.7s test forwards;
  transform-origin: bottom;
  max-height: 90%;

  @keyframes test {
    0% {
      opacity: 0;
      transform: scaleY(0);
    }
    100% {
      opacity: 1;
      transform: scaleY(1);
    }
  }
`;

export const ChattingMessageBox = styled.div`
  overflow-y: auto;
  width: 100%;
  height: auto;
  padding: 1rem;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--bright-gray);
    border-radius: 28px;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--normal-gray);
    border-radius: 28px;
  }
`;

export const ChattingMessage = styled.div<{ type: string }>`
  font-size: 1rem;
  padding: 1rem;
  max-width: 80%;
  border-radius: 28px;
  color: white;
  line-height: 1.2;
  margin: 1rem;
  white-space: pre-line;
  ${({ type }) => CHAT_TYPE_STYLE[type]}
`;

export const ChattingTextareaContainer = styled.div`
  width: auto;
  height: auto;
  margin: 1rem;
  margin-right: 3rem;
  border-radius: 28px;
  border: 1px solid var(--light-gray);
`;

export const ChattingTextarea = styled.textarea`
  line-height: 1.5;
  outline: none;
  max-height: 168px;
  overflow-y: auto;
  width: calc(100% - 1rem);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0.7rem;
  resize: none;
  font-size: 1rem;
  box-sizing: border-box;
  border: none;
`;
