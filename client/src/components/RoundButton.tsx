import { ComponentType, ReactElement } from 'react';
import styled, { FlattenSimpleInterpolation, css } from 'styled-components';

interface ButtonProps {
  title: string;
  types: string;
  icon?: ReactElement<ComponentType>;
}

const ROUND_BUTTON_TYPE: { [index: string]: FlattenSimpleInterpolation } = {
  default: css`
    background-color: var(--white);
    color: var(--dark-blue-black);
    font-weight: 700;
  `,
  dark: css`
    background-color: var(--dark-gray);
    color: var(--white);
  `,
  purple: css`
    background-color: var(--purple);
    color: var(--white);
  `,
};

function RoundButton({ title, types, icon }: ButtonProps) {
  return (
    <RoundButtonStyle types={types}>
      {icon && <Icons>{icon}</Icons>}
      {title}
    </RoundButtonStyle>
  );
}

const RoundButtonStyle = styled.button<{ types: string }>`
  position: relative;
  font-family: Roboto;
  font-size: 1rem;
  width: 100%;
  padding: 1rem 3rem;
  margin: 0.5rem 0;
  border: 2px solid var(--normal-gray);
  border-radius: 100px;
  align-items: center;
  ${({ types }) => ROUND_BUTTON_TYPE[types] || ROUND_BUTTON_TYPE.default};
`;

const Icons = styled.div`
  position: absolute;
  height: 1rem;
  top: 50%;
  left: 3rem;
  transform: translate(-50%, -50%);
`;

export default RoundButton;
