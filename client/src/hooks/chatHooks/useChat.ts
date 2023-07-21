import { CompatClient, Stomp } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { LocalStorage } from '../../utils/browserStorage';
import { LOCAL_STORAGE_KEY_LIST } from '../../assets/constantValue/constantValue';
import { MessageList } from '../../assets/interface/Chat.interface';
import { getChatHistory } from '../../api/chatApis';

const useChat = (roomId: number) => {
  const client = useRef<CompatClient>();
  const [messages, setMessages] = useState<MessageList[]>([]);

  const headerData = {
    Authorization: LocalStorage.get(LOCAL_STORAGE_KEY_LIST.AccessToken),
  };

  const createStompClient = () =>
    Stomp.over(() => {
      const sock = new SockJS(import.meta.env.VITE_BASE_URL + '/ws');
      return sock;
    });

  const connectStompClient = () => {
    if (client.current) {
      client.current.connect(headerData, async () => {
        await getChatHistory(roomId).then((res) => setMessages([...res.data]));
        onSubscribeRoomId();
      });
    }
  };

  const onSubscribeRoomId = () => {
    if (client.current) {
      client.current.subscribe(
        `/sub/${roomId}`,
        (message) => {
          setMessages((messages) => [...messages, JSON.parse(message.body)]);
        },
        headerData
      );
    }
  };

  const onPublishMessage = (message: string) => {
    if (client.current) {
      client.current.send(`/pub/chats/${roomId}`, headerData, message);
    }
  };

  const connect = () => {
    client.current = createStompClient();
    connectStompClient();
  };

  useEffect(() => {
    if (roomId > 0) {
      connect();
    }

    return () => {
      client.current?.disconnect();
    };
  }, [roomId]);

  return {
    messages,
    onPublishMessage,
  };
};

export default useChat;
