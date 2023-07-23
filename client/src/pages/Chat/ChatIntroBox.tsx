import { ChatIntroProps } from '../../assets/interface/Chat.interface';
import { ChattingTextBox } from './ChatBox.style';

function ChatIntroBox({ text }: ChatIntroProps) {
  return (
    <ChattingTextBox>
      <div style={{ fontSize: '1rem' }}>{text}</div>
    </ChattingTextBox>
  );
}

export default ChatIntroBox;
