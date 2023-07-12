import styled from 'styled-components';
import { RECTANGLE_BUTTON_TYPE } from '../../assets/constantValue/constantValue';

export const RectangleButtonStyle = styled.button<{ types: string }>`
  padding: 1rem 2rem;
  ${({ types }) => RECTANGLE_BUTTON_TYPE[types]};
`;
