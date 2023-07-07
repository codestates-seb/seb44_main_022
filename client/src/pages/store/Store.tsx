import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import StoreCard from '../../components/storeCard';
import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import axios from 'axios';
interface Store {
  storeId: number;
  storeName: string;
  storeAddress: string;
  storeImage: string;
}
function Store() {  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<Store[]>([]);
  const [isShowingAll, setIsShowingAll] = useState(true);
  const [page, setPage] = useState(1);
  const [isObserverActive, setIsObserverActive] = useState(false); 
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  };
  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
    };
    const observer = new IntersectionObserver(handleObserver, options);
    const target = document.querySelector('#intersection-target');
    if (target&& isObserverActive) {
      observer.observe(target);
      setIsObserverActive(true); 
    }
    return () => {
      observer.disconnect();
    };
  }, [isObserverActive]);

  useEffect(() => {
    const fetchDataAndActivateObserver = async () => {
     setIsObserverActive(true)
      await fetchData(page, searchTerm);
    };   
    fetchDataAndActivateObserver();
  }, [page, searchTerm]);

  useEffect(() => {
    const fetchDataAndActivateObserver = async () => {
      if (searchTerm.trim() === '') {
        await fetchData(page);
        setIsObserverActive(true); 
      }
    };
    fetchDataAndActivateObserver();
  }, [page, searchTerm]);

  const fetchData = async (page?: number, searchTerm?: string) => {  
    try {
      let url = `https://11e5-218-53-232-194.ngrok-free.app/v1/store`;     
      if (searchTerm && searchTerm.trim() !=='') {
        url += `?storeName=${searchTerm}`;
      } 
      console.log(url)
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });
      const data = response.data;
      if (page === 1) {
        setFilteredData(data);
      } else {
        setFilteredData((prevData) => [...prevData, ...data]);
      }
    } catch (error) {
      console.error('Error fetching store data:', error);
    }
  };
    
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim() === '') {
      showAll();
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  const handleSearch = () => {
    search();
  };

  const search = () => {
    if (searchTerm.trim() === '') {
      setIsShowingAll(true);
    } else {
      setPage(1);
      setIsShowingAll(false);
      fetchData(1, searchTerm);
    }
  };

  const showAll = () => {
    setSearchTerm('');
    setPage(1);
    setIsShowingAll(true);
  };

  return (
    <>
      <StoreSection style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop:'240px'}}>
        <section style={{ width: '70%'}}>    
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <StoreText>
              <h2>Enjoy</h2>
              <p>BUYTE의 입점된 매장들을 살펴보세요!</p>
            </StoreText>
          </div>
          <SearchSection>
            <Search>
              <span onClick={showAll} style={{cursor: 'pointer'}}>매장 목록</span>
              <div style={{display: 'flex', alignItems:'center', position: 'relative'}}>
                <FaSearch onClick={handleSearch} style={{color: 'var(--light-black)', cursor: 'pointer', position: 'absolute', right: '15px'}} />
                <StyledInput 
                  type='text' 
                  placeholder="찾고 있는 매장을 적어주세요." 
                  value={searchTerm} 
                  onChange={handleSearchChange} 
                  onKeyPress={handleKeyPress}
                />
              </div>        
            </Search>
          </SearchSection>
          <StoreListSection>
            <StoreCard data ={isShowingAll ? filteredData : []} />
            <div id="intersection-target"></div>
          </StoreListSection>      
        </section>
      </StoreSection>
    </>
  );
}
export default Store;

const StyledInput = styled.input`
  outline: 1px solid var(--white);
  &:focus {
    outline: 1px solid var(--purple);
  }
`;

const StoreSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center; 
  flex-direction: column;
  margin-top:240px;
  @media (max-width: 772px) {
    margin-top: 120px;
  }
`;

const StoreListSection = styled.section`
  width: 100%;
  section {
    display: flex;
    width: 70%;
  }
`;

const StoreText = styled.div`
  width: 70%;
  padding: 1rem 0; 
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 30px;
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
`;

const Search = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 2.9rem;
  align-items: center;
  span {
    color: var(--light-gray);
    font-size: 13px;
  }
  @media (max-width: 772px) {
    span {
      display: none;
    }
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
  @media (max-width: 772px) {
    flex-direction: column;
    align-items: center;
    margin: 0.5rem auto; 
    padding-bottom: 1rem; 
  }
`;

const SearchSection =styled.section`
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