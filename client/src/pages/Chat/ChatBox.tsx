import { useEffect, useRef, useState } from 'react';
import { ExitMapModalButton } from '../map/Map.style';
import useScrollBottom from '../../hooks/chatHooks/useScrollBottom';
import useTextareaAutoHeight from '../../hooks/chatHooks/useTextareaAutoHeight';
import { ChatBoxProps } from '../../assets/interface/Button.interface';
import {
  ChattingContainer,
  ChattingMessage,
  ChattingMessageBox,
  ChattingTextarea,
  ChattingTextareaContainer,
} from './ChatBox.style';

function ChatBox({ setIsOpenChatting }: ChatBoxProps) {
  const [messages, setMessages] = useState([
    { type: 'question', message: '안녕하세요?' },
    { type: 'answer', message: '네 안녕하세요.' },
    {
      type: 'question',
      message:
        '안녕하세요오안녕하세요오안녕하세요오안녕하세요오안녕하세요오안녕하세요오안녕하세요오안녕하세요오안녕하세요오안녕하세요오안녕하세요오안녕하세요오',
    },
  ]);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputMessageRef = useRef<HTMLTextAreaElement>(null);
  const [chatText, setChatText] = useState<string>('');

  useTextareaAutoHeight(inputMessageRef, chatText);
  useScrollBottom(messageEndRef, messages, chatText);

  const handleEnter: React.FormEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    if (chatText.length !== 0) {
      setMessages([...messages, { type: 'answer', message: chatText }]);
      setChatText('');
      return;
    }
    alert('메세지를 입력한 뒤에 전송해주세요.');
  };

  useEffect(() => {
    const handleEscDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpenChatting(false);
      }
    };

    document.addEventListener('keydown', handleEscDown);

    return () => document.removeEventListener('keydown', handleEscDown);
  }, []);

  return (
    <ChattingContainer>
      <ExitMapModalButton onClick={() => setIsOpenChatting(false)}>BUYTE</ExitMapModalButton>
      <ChattingMessageBox>
        {messages.map((e, idx) => (
          <ChattingMessage key={idx} type={e.type}>
            {e.message}
          </ChattingMessage>
        ))}

        <div ref={messageEndRef} />
      </ChattingMessageBox>
      <ChattingTextareaContainer>
        <ChattingTextarea
          ref={inputMessageRef}
          value={chatText}
          onChange={(e) => setChatText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              if (e.shiftKey) {
                e.preventDefault();
                setChatText(chatText + '\n');
              } else {
                e.preventDefault();
                handleEnter(e);
              }
            }
          }}
          rows={1}
        />
      </ChattingTextareaContainer>
    </ChattingContainer>
  );
}

export default ChatBox;
