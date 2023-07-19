import { useState } from 'react';
import ModalPortal from '../../share/ModalPortal';
import { ChattingOpenButton } from './ChatButton.style';
import ChatBox from './ChatBox';

interface ChatButtonProp {
  storeId: string;
}

function ChatButton({ storeId }: ChatButtonProp) {
  const [isOpenChatting, setIsOpenChatting] = useState<boolean>(false);

  return (
    <ModalPortal>
      {isOpenChatting ? (
        <ChatBox setIsOpenChatting={setIsOpenChatting} storeId={storeId} />
      ) : (
        <ChattingOpenButton onClick={() => setIsOpenChatting(true)}>+</ChattingOpenButton>
      )}
    </ModalPortal>
  );
}

export default ChatButton;
