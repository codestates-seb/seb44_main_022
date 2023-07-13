import { RectangleButtonProps } from '../../assets/interface/Button.interface';
import { RectangleButtonStyle } from './RectangleButton.style';

function RectangleButton({ text, types, handleClick }: RectangleButtonProps) {
  return (
    <RectangleButtonStyle types={types} onClick={handleClick}>
      {text}
    </RectangleButtonStyle>
  );
}

export default RectangleButton;
