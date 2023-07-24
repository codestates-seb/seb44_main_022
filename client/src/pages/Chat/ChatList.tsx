import { useEffect, useState } from 'react';
import { ChatListType } from '../../assets/interface/Chat.interface';
import { getSellerChatList } from '../../api/chatApis';
import ChatBox from './ChatBox';
import { ChatListContainer, ChatListItem } from './ChatList.style';

function ChatList() {
  const [chatList, setChatList] = useState<ChatListType[]>([]);
  const [isOpenChatting, setIsOpenChatting] = useState<boolean>(false);
  const [activeChat, setActiveChat] = useState<number | null>(null);

  useEffect(() => {
    getSellerChatList()
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
                key={chatListItem.roomId}
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
