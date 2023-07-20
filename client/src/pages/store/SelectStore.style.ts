import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20rem;
  margin-top: 17vh;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8rem;
    margin-top: 8vh;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45%;

  @media (max-width: 768px) {
    width: 90%;
    margin-bottom: 50px;
  }
`;

export const TextButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  color: var(--dark-gray);
  white-space: nowrap;
  font-family: 'BMJUA';

  @media (max-width: 768px) {
    margin-top: 1vh;
  }
`;

export const Button = styled.button`
  margin-top: 1vh;
  font-size: 16px;
  font-family: 'BMJUA';
  padding: 14px 30px;
  border-radius: 20px;
  border: solid;
  border-color: var(--purple);
  color: var(--purple);
  white-space: nowrap;

  &:hover {
    color: #8582de;
    border-color: #8582de;
  }

  &:active {
    color: #8582de;
    border-color: #8582de;
    background-color: var(--light-purple);
  }

  @media (max-width: 768px) {
    margin-top: 2vh;
    width: 110%;
    font-size: 13px;
  }
`;
