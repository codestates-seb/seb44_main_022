import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ModalPortal from '../../share/ModalPortal';
import { ExitMapModalButton } from '../map/Map.style';

const ChattingOpenButton = styled.div`
  display: flex;
  justify-content: center;
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
  animation: 0.3s test 0.5s forwards;
  transform-origin: center;

  @keyframes test {
    0% {
      opacity: 0;
      transform: scale(0.5, 0.5);
    }
    100% {
      opacity: 1;
      transform: scale(1, 1);
    }
  }
`;

const ChattingContainer = styled.div`
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

const ChattingMessageBox = styled.div`
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

function ChatButton() {
  const [isOpenChatting, setIsOpenChatting] = useState<boolean>(false);
  const [messages, setMessages] = useState([
    { type: '질문', message: '안녕하세요?' },
    { type: '답변', message: '네 안녕하세요.' },
    {
      type: '질문',
      message:
        '안녕하세요오안녕하세요오안녕하세요오안녕하세요오안녕하세요오안녕하세요오안녕하세요오안녕하세요오안녕하세요오안녕하세요오안녕하세요오안녕하세요오',
    },
  ]);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputMessageRef = useRef<HTMLTextAreaElement>(null);
  const [chatText, setChatText] = useState<string>('');

  const handleResizeHeight = () => {
    if (inputMessageRef.current?.style) {
      inputMessageRef.current.style.height = 'auto';
      inputMessageRef.current.style.height = `${inputMessageRef.current.scrollHeight}px`;
    }
  };

  const handleEnter: React.FormEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    if (chatText.length !== 0) {
      console.log(messages);
      setMessages([...messages, { type: '답변', message: chatText }]);
      setChatText('');
      handleResizeHeight();
      return;
    }
    alert('메세지를 입력한 뒤에 전송해주세요.');
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleEscDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpenChatting(false);
      }
    };

    document.addEventListener('keydown', handleEscDown);

    return () => document.removeEventListener('keydown', handleEscDown);
  }, []);

  useEffect(() => {
    handleResizeHeight();
  }, [chatText]);

  return (
    <ModalPortal>
      {isOpenChatting ? (
        <ChattingContainer>
          <ExitMapModalButton onClick={() => setIsOpenChatting(false)}>BUYTE</ExitMapModalButton>
          <ChattingMessageBox>
            {messages.map((e, idx) =>
              e.type === '질문' ? (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#33C658',
                    fontSize: '1rem',
                    padding: '1rem',
                    maxWidth: '80%',
                    borderRadius: '28px',
                    color: 'white',
                    lineHeight: '1.2',
                    margin: '1rem',
                    alignSelf: 'flex-start',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {e.message}
                </div>
              ) : (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#0079FF',
                    fontSize: '1rem',
                    padding: '1rem',
                    maxWidth: '80%',
                    borderRadius: '28px',
                    color: 'white',
                    lineHeight: '1.2',
                    margin: '1rem',
                    alignSelf: 'flex-end',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {e.message}
                </div>
              )
            )}

            <div ref={messageEndRef} />
          </ChattingMessageBox>
          <div
            style={{
              width: 'auto',
              height: 'auto',
              margin: '1rem',
              marginRight: '3rem',
              borderRadius: '28px',
              border: '1px solid var(--light-gray)',
            }}
          >
            <textarea
              ref={inputMessageRef}
              value={chatText}
              onChange={(e) => setChatText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleEnter(e);
                }
                if (e.key === 'Enter' && e.shiftKey) {
                  e.preventDefault();
                  setChatText(chatText + '\n');
                }
              }}
              rows={1}
              style={{
                lineHeight: '1.5',
                outline: 'none',
                maxHeight: '168px',
                overflowY: 'auto',
                width: 'calc(100% - 1rem)',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                margin: '0.7rem',
                resize: 'none',
                fontSize: '1rem',
                boxSizing: 'border-box',
                border: 'none',
              }}
            />
          </div>
        </ChattingContainer>
      ) : (
        <ChattingOpenButton onClick={() => setIsOpenChatting(true)}>+</ChattingOpenButton>
      )}
    </ModalPortal>
  );
}

export default ChatButton;
