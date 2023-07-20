import styled from 'styled-components';
import { CHAT_TYPE_STYLE, CHAT_TYPE_TIME_STYLE } from '../../assets/constantValue/constantValue';
import { sliceUp } from '../../styles/keyframes';

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
  animation: 0.7s ${sliceUp} forwards;
  transform-origin: bottom;
  max-height: 90%;
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

export const ChattingHeaderLogo = styled.div`
  position: absolute;
  font-size: 1.5rem;
  font-family: Just Another Hand, cursive;
  top: 2%;
  left: 5%;
`;

export const ChattingHeaderStore = styled.div`
  position: absolute;
  font-size: 1rem;
  top: 3%;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 700;
`;

export const ChattingMessage = styled.div<{ type: string }>`
  font-size: 1rem;
  padding: 1rem;
  max-width: 80%;
  border-radius: 28px;
  color: var(--gray);
  line-height: 1.2;
  margin: 0.5rem;
  white-space: pre-line;
  word-wrap: break-word;
  font-family: BMJUA;
  position: relative;

  ${({ type }) => CHAT_TYPE_STYLE[type]}
`;

export const ChattingTextBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ChattingTime = styled.span<{ type: string }>`
  position: absolute;
  font-family: BMJUA;
  font-size: 14px;
  align-self: flex-end;
  bottom: 0px;
  ${({ type }) => CHAT_TYPE_TIME_STYLE[type]}
`;

export const ChattingTextareaContainer = styled.div`
  width: auto;
  height: auto;
  margin: 1rem;
  margin-right: 3rem;
  border-radius: 28px;
  box-shadow: 1px 1px 5px 1px var(--light-gray);
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
  font-family: BMJUA;
  box-sizing: border-box;
  border: none;
  white-space: pre-line;

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
