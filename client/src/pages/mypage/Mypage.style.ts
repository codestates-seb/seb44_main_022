import styled from 'styled-components';
export const MyPageWrapper = styled.section`
  width: 70%;
  margin-bottom: 80px;
`
export const WelcomeText = styled.p`
   font-weight:800;
   color: var(--dark-gray);
   text-align:center; 
   margin-bottom:30px; 
   font-size:18px;
`
export const MyInfoSection = styled.section`
  width: 100%;
  display: flex;
  padding: 1rem; 
`
export const MyInfoDetail = styled.section`
  margin-left: 2rem;
  margin-top: 3.3rem;
  min-width: 300px;
  h3 {
    color: var(--light-gray);
    margin-bottom: 2.3rem;
    font-size: 18px;
    font-weight: 800;
  }
  @media (max-width: 780px) {
    margin-left: 0.5rem;
}
`
export const MyOrderSection= styled.section`
  padding: 3rem 1rem;
  border: 1px solid var(--light-purple);
  border-radius: 10px;
  h2 {
  font-weight:800;
  font-size:18px; 
  color:var(--light-gray);
  margin-bottom:10px; 
  margin-left: 20px
  }
`
export const MyOrderLists= styled.section`
padding: 1rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
div{
  width: 100%;
}
`

export const SizeSelect = styled.select`
  margin-right: 1rem;
  padding: 5px;
  border: 1px solid var(--light-gray);
  background-color: var(--white);
  color: var(--dark-gray);
  border-radius: 5px;
  outline: 1px solid var(--light-purple);
`;
