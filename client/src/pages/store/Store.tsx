import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import StoreCard from '../../components/storeCard';
import Header from '../../share/Header';
import Footer from '../../share/Footer';
function Store() {
  return <><Header/>
  <section style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop:'240px'}}>
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
              <div style={{display: 'flex', alignItems:'center', position: 'relative'}}>
                <FaSearch style={{color: 'var(--light-black)', position: 'absolute', right: '15px'}}/>
                <input type='text' placeholder="찾고 있는 매장을 적어주세요." />
              </div>        
        </Search>
      </SearchSection>
      <StoreListSection>
        <section>
          <StoreCard/>
        </section>
      </StoreListSection>      
      </section>
     </section>
  <Footer/>
  </>
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
  font-family: inherit;
  color: var(--light-black);  
}
p {
  font-size: 14px;
  margin-bottom: 50px;
  color: var(--light-black); 
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
margin: 30px 0;
&::after {
  content:"";
  display: block;
  background-color: var(--light-gray);
  height: 1.5px;
  width: 100%;
  margin-top: 20px;
}
`