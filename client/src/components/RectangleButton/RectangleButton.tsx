import { RectangleButtonStyle } from './RectangleButton.style';

interface RectangleButtonProps {
  text: string;
  types: string;
  clickEvent: () => void;
}

function RectangleButton({ text, types, clickEvent }: RectangleButtonProps) {
  return (
    <RectangleButtonStyle types={types} onClick={clickEvent}>
      {text}
    </RectangleButtonStyle>
  );
}

export default RectangleButton;
