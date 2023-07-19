import { useEffect, useRef, useState } from 'react';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ExitMapModalButton } from '../map/Map.style';
import useScrollBottom from '../../hooks/chatHooks/useScrollBottom';
import useTextareaAutoHeight from '../../hooks/chatHooks/useTextareaAutoHeight';
import { LocalStorage } from '../../utils/browserStorage';
import { LOCAL_STORAGE_KEY_LIST } from '../../assets/constantValue/constantValue';
import { ChatBoxProps, messageList } from '../../assets/interface/Chat.interface';
import axiosInstance from '../../api/apis';
import {
  ChattingContainer,
  ChattingMessage,
  ChattingMessageBox,
  ChattingTextarea,
  ChattingTextareaContainer,
} from './ChatBox.style';

function ChatBox({ setIsOpenChatting, storeId }: ChatBoxProps) {
  const [messages, setMessages] = useState<messageList[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputMessageRef = useRef<HTMLTextAreaElement>(null);
  const [chatText, setChatText] = useState<string>('');
  const [roomId, setRoomId] = useState<number>(0);
  const [senderId, setSenderId] = useState<number>(0);
  const [receiverId, setReceiverId] = useState<number>(0);

  const handleEnter: React.FormEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    if (chatText.length !== 0) {
      onPublishMessage(chatText);
      setChatText('');
      return;
    }
    alert('메세지를 입력한 뒤에 전송해주세요.');
  };

  const client = useRef<CompatClient>();

  const connect = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS('https://api.buyte.site/ws');
      return sock;
    });
    if (client.current) {
      client.current.connect(
        {
          Authorization: LocalStorage.get(LOCAL_STORAGE_KEY_LIST.AccessToken),
        },
        () => {
          if (client.current)
            client.current.subscribe(
              `/sub/${roomId}`,
              (message) => {
                setMessages((messages) => [...messages, JSON.parse(message.body)]);
              },
              {
                Authorization: LocalStorage.get(LOCAL_STORAGE_KEY_LIST.AccessToken),
              }
            );
        }
      );
    }
  };

  const onPublishMessage = (chatText: string) => {
    const Text = JSON.stringify({
      senderId: senderId,
      receiverId: receiverId,
      content: chatText,
    });
    if (client.current) {
      client.current.send(
        `/pub/chats/${roomId}`,
        {
          Authorization: LocalStorage.get(LOCAL_STORAGE_KEY_LIST.AccessToken),
        },
        Text
      );
    }
  };

  useTextareaAutoHeight(inputMessageRef, chatText);
  useScrollBottom(messageEndRef, messages, chatText);

  useEffect(() => {
    axiosInstance
      .get(`/room?storeId=${storeId}`)
      .then((res) => {
        setRoomId(res.data.roomId);
        setReceiverId(res.data.receiverId);
        setSenderId(res.data.senderId);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (roomId > 0) {
      connect();
    }

    return () => {
      client.current?.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    const handleEscDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpenChatting(false);
      }
    };

    document.addEventListener('keydown', handleEscDown);

    return () => {
      document.removeEventListener('keydown', handleEscDown);
    };
  }, []);

  return (
    <ChattingContainer>
      <ExitMapModalButton onClick={() => setIsOpenChatting(false)}>BUYTE</ExitMapModalButton>
      <ChattingMessageBox>
        {messages.length > 0 &&
          messages.map((e, idx) => (
            <ChattingMessage key={idx} type={e.receiverId === receiverId ? 'answer' : 'question'}>
              {e.content.length > 1 && e.content}
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
