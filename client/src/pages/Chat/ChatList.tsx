import { useEffect, useState } from 'react';
import axiosInstance from '../../api/apis';
import ChatBox from './ChatBox';

function ChatList() {
  // 관리자 or 나중에 구현할 사업자 전용 페이지로 디자인 미구현이라 임의로 구성중입니다.
  const [chatList, setChatList] = useState<any>([]);
  const [isOpenChatting, setIsOpenChatting] = useState<boolean>(false);
  const [activeChat, setActiveChat] = useState<number | null>(null);

  useEffect(() => {
    axiosInstance
      .get('/room/seller')
      .then((res) => setChatList([...res.data]))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      style={{
        marginTop: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {chatList !== undefined &&
        chatList.length > 0 &&
        chatList.map((e: any) => {
          return (
            <>
              <div
                style={{
                  border: '1px solid red',
                  width: '80%',
                  height: '3rem',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                key={e.receiverId}
                onClick={() => {
                  console.log(e.roomId);
                  setActiveChat(e.roomId);
                  setIsOpenChatting(true);
                }}
              >
                <div style={{ padding: '0rem 0.5rem' }}>{e.customerName}</div>
              </div>
              {activeChat === e.roomId && isOpenChatting && (
                <ChatBox
                  key={e.receiverId}
                  setIsOpenChatting={setIsOpenChatting}
                  storeId="1"
                  roomIdProps={e.roomId}
                  receiverIdProps={e.senderId}
                  senderIdProps={e.receiverId}
                />
              )}
            </>
          );
        })}
    </div>
  );
}

export default ChatList;
