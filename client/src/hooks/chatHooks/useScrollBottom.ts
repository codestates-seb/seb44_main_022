import { useEffect } from 'react';
import { messageList } from '../../assets/interface/Chat.interface';

const useScrollBottom = (
  ref: React.RefObject<HTMLDivElement>,
  messageList: messageList[],
  chatText: string
) => {
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList, chatText]);
};

export default useScrollBottom;
