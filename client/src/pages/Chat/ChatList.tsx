import { useEffect, useState } from 'react';
import axiosInstance from '../../api/apis';
import ChatBox from './ChatBox';
import { ChatListContainer, ChatListItem } from './ChatList.style';

interface ChatListType {
  senderId: number;
  receiverId: number;
  roomId: number;
  customerName: string;
  storeName: string;
}

function ChatList() {
  // 관리자 or 나중에 구현할 사업자 전용 페이지로 디자인 미구현이라 임의로 구성중입니다.
  const [chatList, setChatList] = useState<ChatListType[]>([]);
  const [isOpenChatting, setIsOpenChatting] = useState<boolean>(false);
  const [activeChat, setActiveChat] = useState<number | null>(null);

  useEffect(() => {
    axiosInstance
      .get('/room/seller')
      .then((res) => setChatList([...res.data]))
      .catch((err) => console.log(err));
  }, []);

  return (
    <ChatListContainer>
      {chatList !== undefined &&
        chatList.length > 0 &&
        chatList.map((chatListItem: ChatListType) => {
          return (
            <>
              <ChatListItem
                key={chatListItem.receiverId}
                onClick={() => {
                  setActiveChat(chatListItem.roomId);
                  setIsOpenChatting(true);
                }}
              >
                <div style={{ padding: '0rem 0.5rem' }}>{chatListItem.storeName}</div>
                <div style={{ padding: '0rem 0.5rem' }}>{chatListItem.customerName}</div>
              </ChatListItem>
              {activeChat === chatListItem.roomId && isOpenChatting && (
                <ChatBox
                  setIsOpenChatting={setIsOpenChatting}
                  storeName={chatListItem.storeName}
                  roomIdProps={chatListItem.roomId}
                  receiverIdProps={chatListItem.senderId}
                  senderIdProps={chatListItem.receiverId}
                />
              )}
            </>
          );
        })}
    </ChatListContainer>
  );
}

export default ChatList;
