import { useState } from 'react';
import ModalPortal from '../../share/ModalPortal';
import { ChatButtonProp } from '../../assets/interface/Chat.interface';
import Vector from '../../assets/images/Vector.png';
import { ChattingOpenButton } from './ChatButton.style';
import ChatBox from './ChatBox';

function ChatButton({ storeId, storeName }: ChatButtonProp) {
  const [isOpenChatting, setIsOpenChatting] = useState<boolean>(false);

  return (
    <ModalPortal>
      {isOpenChatting ? (
        <ChatBox setIsOpenChatting={setIsOpenChatting} storeId={storeId} storeName={storeName} />
      ) : (
        <ChattingOpenButton onClick={() => setIsOpenChatting(true)}>
          <img
            src={Vector}
            style={{
              width: '2.5rem',
              height: '2.5rem',
              filter:
                'invert(63%) sepia(0%) saturate(0%) hue-rotate(92deg) brightness(97%) contrast(89%)',
            }}
          />
        </ChattingOpenButton>
      )}
    </ModalPortal>
  );
}

export default ChatButton;
