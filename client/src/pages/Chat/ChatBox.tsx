import { useEffect, useRef, useState } from 'react';
import { BsCircleFill } from 'react-icons/bs';
import useScrollBottom from '../../hooks/chatHooks/useScrollBottom';
import useTextareaAutoHeight from '../../hooks/chatHooks/useTextareaAutoHeight';
import { BaseChatData, ChatBoxProps } from '../../assets/interface/Chat.interface';
import { getChatRoomId } from '../../api/chatApis';
import useKeydown from '../../hooks/useKeydown';
import useChat from '../../hooks/chatHooks/useChat';
import { ExitMapModalButton } from '../map/MapModal.style';
import {
  ChatButtonImg,
  ChattingContainer,
  ChattingHeaderStore,
  ChattingMessage,
  ChattingMessageBox,
  ChattingTextarea,
  ChattingTextareaContainer,
  ChattingTime,
} from './ChatBox.style';
import ChatIntroBox from './ChatIntroBox';
import { ChattingPostButton } from './ChatButton.style';

function ChatBox({
  setIsOpenChatting,
  storeId,
  storeName,
  roomIdProps = 0,
  receiverIdProps = 0,
  senderIdProps = 0,
}: ChatBoxProps) {
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputMessageRef = useRef<HTMLTextAreaElement>(null);
  const [chatText, setChatText] = useState<string>('');
  const [roomId, setRoomId] = useState<number>(roomIdProps);
  const [senderId, setSenderId] = useState<number>(receiverIdProps);
  const [receiverId, setReceiverId] = useState<number>(senderIdProps);
  const [showChatBox, setShowChatBox] = useState<boolean>(false);
  const [isDelaySend, setIsDelaySend] = useState<boolean>(true);
  const { messages, onPublishMessage } = useChat(roomId);

  const createMessageTime = () => {
    return (
      String(new Date().getHours()).padStart(2, '0') +
      ':' +
      String(new Date().getMinutes()).padStart(2, '0')
    );
  };

  const handleKeyPress: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.shiftKey ? setChatText(chatText + '\n') : handleEnter(e);
    }
  };

  const publish = (Message: string) => {
    onPublishMessage(Message);
    setChatText('');
    setIsDelaySend(false);
    setTimeout(() => setIsDelaySend(true), 1000);
  };

  const handleEnter: React.FormEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    if (chatText.length !== 0) {
      const Message = JSON.stringify({
        senderId: senderId,
        receiverId: receiverId,
        content: chatText,
      });
      publish(Message);

      return;
    }
    alert('메세지를 입력한 뒤에 전송해주세요.');
  };

  const handleEscDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpenChatting(false);
    }
  };

  const setInitChatData = (chatData: BaseChatData) => {
    const { roomId, receiverId, senderId } = chatData;
    setRoomId(roomId);
    setReceiverId(receiverId);
    setSenderId(senderId);
  };

  useKeydown(handleEscDown);
  useTextareaAutoHeight(inputMessageRef, chatText);
  useScrollBottom(messageEndRef, messages, chatText);

  useEffect(() => {
    if (roomId === 0) {
      getChatRoomId(storeId)
        .then((res) => {
          setInitChatData(res.data);
          setShowChatBox(true);
        })
        .catch((err) => console.log(err));
      return;
    }
    setShowChatBox(true);
  }, []);

  return (
    <>
      {showChatBox && (
        <ChattingContainer>
          <ChattingHeaderStore>{storeName}</ChattingHeaderStore>

          <ExitMapModalButton onClick={() => setIsOpenChatting(false)}>
            <BsCircleFill style={{ color: 'var(--purple)' }} />
          </ExitMapModalButton>

          {receiverId === senderId ? (
            <ChatIntroBox text="판매자는 판매자의 가게에 채팅할 수 없습니다." />
          ) : messages !== undefined && messages.length > 0 ? (
            <ChattingMessageBox>
              {messages.map((e, idx) => (
                <ChattingMessage
                  key={idx}
                  type={e.receiverId === receiverId ? 'answer' : 'question'}
                >
                  {e.content.length > 0 && e.content}
                  <ChattingTime type={e.receiverId === receiverId ? 'answer' : 'question'}>
                    {e.createdAt ? e.createdAt.slice(11, 16) : createMessageTime()}
                  </ChattingTime>
                </ChattingMessage>
              ))}
              <div ref={messageEndRef} />
            </ChattingMessageBox>
          ) : (
            <ChatIntroBox text="판매자님과 채팅을 시작하세요!" />
          )}
          {receiverId !== senderId && (
            <>
              <ChattingTextareaContainer>
                <ChattingTextarea
                  ref={inputMessageRef}
                  value={chatText}
                  onChange={(e) => setChatText(e.target.value)}
                  onKeyDown={(e) => {
                    if (isDelaySend) {
                      handleKeyPress(e);
                    }
                  }}
                  rows={1}
                />
              </ChattingTextareaContainer>
              <ChattingPostButton
                onClick={(e) => {
                  if (isDelaySend) {
                    handleEnter(e);
                  }
                }}
              >
                <ChatButtonImg />
              </ChattingPostButton>
            </>
          )}
        </ChattingContainer>
      )}
    </>
  );
}

export default ChatBox;
