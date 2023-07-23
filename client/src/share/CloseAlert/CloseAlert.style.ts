import styled, {css} from 'styled-components';
interface CloseAlertProps {
  positionAbsolute?: boolean; 
}
export const CloseAlertWrapper = styled.section<CloseAlertProps>`
  display: flex;
  align-items: center;
  z-index: 11;
  ${({ positionAbsolute }) =>
    positionAbsolute &&
    css`
      position: absolute;
      left:50%;
      top: 50%;
      transform: translate(-50%, -50%);
    `}
`;
export const CloseAlertSection = styled.div<CloseAlertProps>`
  background-color: #ffffff;
  width: 300px;
  height: 220px;
  border: 3px solid var(--gray);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  background-color: #8c8c8c;
  width: 120px;
  height: 50px;
  border: 1px solid var(--background);
  border-radius: 10px;
  margin: 4px;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    transition: all 0.3s;
    background-color: var(--dark-gray);
  }
`;
export const WhiteButton = styled(Button)`
  background-color: #f15757;
  color: white;
  &:hover {
    background-color: #d83838;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); 
  z-index: 10; 
`;