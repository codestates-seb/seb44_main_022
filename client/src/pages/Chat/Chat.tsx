import { useState } from 'react';
import ModalPortal from '../../share/ModalPortal';
import { ChattingOpenButton } from './ChatButton.style';
import ChatBox from './ChatBox';

function ChatButton() {
  const [isOpenChatting, setIsOpenChatting] = useState<boolean>(false);

  return (
    <ModalPortal>
      {isOpenChatting ? (
        <ChatBox setIsOpenChatting={setIsOpenChatting} />
      ) : (
        <ChattingOpenButton onClick={() => setIsOpenChatting(true)}>+</ChattingOpenButton>
      )}
    </ModalPortal>
  );
}

export default ChatButton;
