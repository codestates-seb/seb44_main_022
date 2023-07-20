import { ChattingTextBox } from './ChatBox.style';

interface ChatIntroProps {
  text: string;
}

function ChatIntroBox({ text }: ChatIntroProps) {
  return (
    <ChattingTextBox>
      <div style={{ fontSize: '1rem' }}>{text}</div>
    </ChattingTextBox>
  );
}

export default ChatIntroBox;
