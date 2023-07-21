import styled from 'styled-components';
import loading from '../../assets/images/loading.gif';

export const StyledInput = styled.input`
  outline: 1px solid var(--white);
  &:focus {
    outline: 1px solid var(--purple);
  }
`;

export const StoreSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center; 
  flex-direction: column;
  margin-top: 170px;
  margin-bottom: 80px;
  @media (max-width: 772px) {
    margin-top: 120px;
  }
`;

export const StoreListSection = styled.section`
  width: 100%;
  section {
    display: flex;
    width: 70%;
  }
`;

export const StoreText = styled.div`
  width: 70%;
  padding: 1rem 0; 
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    font-size: 38px;
    margin-bottom: 30px;
    font-weight: 600;
    font-family: 'BMJUA';
    color: var(--light-black);  
  }
  p {
    font-size: 16px;
    margin-bottom: 50px;
    color: var(--light-black); 
    font-family:'Yaldevi'
  }
`;

export const Search = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  align-items: center;
  span {
    color: var(--light-gray);
    font-size: 16px;
    font-family:'Yaldevi'
  }
  @media (max-width: 800px) {
    span {
      display: none;
    }
  }
  input {
    background-color: var(--gray);  
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    width: 350px;
    color: var(--dark-gray);
    font-family:'Yaldevi';
  }
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    margin: 0.5rem auto; 
    padding-bottom: 1rem; 
  }
`;

export const SearchSection =styled.section`
  margin: 30px 0;
  &::after {
    content:"";
    display: block;
    background-color: var(--light-purple);
    height: 1.5px;
    width: 100%;
    margin-top: 20px;
  }
`;

export const Loading = styled.div`
  background-image: url(${loading});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;