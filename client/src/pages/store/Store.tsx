import styled from 'styled-components';
import StoreCard from '../../components/storeCard';
function Store() {
  return <StoreArea>
    <div>헤더 올 자리</div>
    <section style={{ width: '70%'}}>    
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <StoreText>
            <h2>Enjoy</h2>
            <p>BUYTE의 입점된 매장들을 살펴보세요!</p>
          </StoreText>
      </div>
      <SearchSection>
        <Search>
              <span>매장 목록</span>
              <input type='text' placeholder="찾고 있는 매장을 적어주세요."></input>
        </Search>
      </SearchSection>
      <StoreListSection>
        <section>
          <StoreCard/>
          <div></div>
        </section>
      </StoreListSection>
      
      </section>
      <div>footer 올 자리</div>
  </StoreArea>
}

export default Store;


const StoreListSection = styled.section`
width: 100%;
height: 100vh;
background-color: #a5d6d6;
section {
  display: flex;
  width: 70%;
}
`
const StoreArea = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const StoreText = styled.div`
width: 70%;
padding: 30px 0; 
display: flex;
flex-direction: column;
align-items: center;
h2 {
  font-size: 25px;
  margin-bottom: 40px;
  font-weight: 600;
}
p {
  font-size: 14px;
  margin-bottom: 50px;
}
`
const Search = styled.div`
display: flex;
justify-content: space-between;
margin: 0.5rem 2.9rem;
align-items: center;
span {
  color: var(--light-gray);
  font-size: 13px;
}
input {
  background-color: var(--gray);  
  border: none;
  border-radius: 20px;
  padding: 7px 20px;
  width: 300px;
  font-family: inherit;
  color: var(--dark-gray)
}
`
const SearchSection =styled.section`
&::after {
  content:"";
  display: block;
  background-color: var(--light-gray);
  height: 1.5px;
  width: 100%;
}
`