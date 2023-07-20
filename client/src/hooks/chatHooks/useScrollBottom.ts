import { useEffect } from 'react';
import { MessageList } from '../../assets/interface/Chat.interface';

const useScrollBottom = (
  ref: React.RefObject<HTMLDivElement>,
  messageList: MessageList[],
  chatText: string
) => {
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList, chatText]);
};

export default useScrollBottom;
