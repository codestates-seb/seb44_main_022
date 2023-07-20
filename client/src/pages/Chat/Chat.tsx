import { useState } from 'react';
import ModalPortal from '../../share/ModalPortal';
import { ChatButtonProp } from '../../assets/interface/Chat.interface';
import { ChattingOpenButton } from './ChatButton.style';
import ChatBox from './ChatBox';

function ChatButton({ storeId, storeName }: ChatButtonProp) {
  const [isOpenChatting, setIsOpenChatting] = useState<boolean>(false);

  return (
    <ModalPortal>
      {isOpenChatting ? (
        <ChatBox setIsOpenChatting={setIsOpenChatting} storeId={storeId} storeName={storeName} />
      ) : (
        <ChattingOpenButton onClick={() => setIsOpenChatting(true)}>+</ChattingOpenButton>
      )}
    </ModalPortal>
  );
}

export default ChatButton;
