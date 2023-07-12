import styled from 'styled-components';
import { ROUND_BUTTON_TYPE } from '../../assets/constantValue/constantValue';

export const RoundButtonStyle = styled.button<{ types: string }>`
  position: relative;
  font-family: Roboto;
  font-size: 1rem;
  width: 100%;
  padding: 1rem 3rem;
  margin: 0.5rem 0;
  border: 2px solid var(--normal-gray);
  border-radius: 100px;
  align-items: center;
  outline: none;
  transition: 0.3s;
  ${({ types }) => ROUND_BUTTON_TYPE[types]};
`;

export const Icons = styled.div`
  position: absolute;
  height: 1rem;
  top: 50%;
  left: 3rem;
  transform: translate(-50%, -50%);
`;
