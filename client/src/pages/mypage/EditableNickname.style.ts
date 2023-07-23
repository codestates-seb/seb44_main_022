import styled from 'styled-components';


export const EditInput = styled.input`
    width: 350px;
    font-size: 18px;
    margin-bottom: 18px;
    padding: 3px 8px 4px 8px;
    border: 1px solid var(--light-gray);
    font-family: inherit;
    color: var(--dark-gray);
    position: relative;
    top: -6px;
    border-radius: 5px;;
  &:focus {
    outline: 1px solid var(--purple);
  }
`

export const EditButton = styled.button`
  width: 60px;
  height: 30px;
  background-color: var(--purple);
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  color: var(--black);
  border: none;
  border-radius: 20px;
  :hover {
    transition: 1s ease;
    background-color: var(--blue-purple);
  }
`

export const DeleteAccountButton = styled(EditButton)`
  background-color: #f15757;    
  width: 80px;
  color: white;  
  :hover {        
    background-color: #AB0A0A;
  }
`;