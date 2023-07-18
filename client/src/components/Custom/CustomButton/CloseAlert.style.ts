import styled from 'styled-components';

export const CloseAlertWrapper = styled.section`
  display: flex;
  align-items: center;
  z-index: 11;
`;
export const CloseAlertSection = styled.div`
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
