import { RectangleButtonProps } from '../../assets/interface/Button.interface';
import { RectangleButtonStyle } from './RectangleButton.style';

function RectangleButton({ text, types, clickEvent }: RectangleButtonProps) {
  return (
    <RectangleButtonStyle types={types} onClick={clickEvent}>
      {text}
    </RectangleButtonStyle>
  );
}

export default RectangleButton;
