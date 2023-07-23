import styled from 'styled-components';

export const CartAlertWrapper = styled.section`
    display: flex;
    align-items: center;
    z-index: 11;
`
export const CartAlert = styled.div`
    background-color: #ffffff;
    width: 300px;
    height: 200px;
    border: 3px solid var(--purple);
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const Button = styled.button`
    background-color: var(--dark-purple);
    width: 120px;
    height: 50px;
    border: none;
    border-radius: 10px;
    margin: 4px;
    transition: all 0.3s;
    cursor: pointer;
    &:hover{
        transition: all 0.3s;
        background-color: #353361;
    }
`
export const WhiteButton = styled(Button)`
  background-color: var(--white);
  color: var(--purple);
  border: 1px solid var(--purple);
  &:hover {
    background-color: var(--gray);
  }
`;