import { FaSearch } from 'react-icons/fa';
import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import StoreCard from '../../components/storeCard';
import axiosInstance from '../../api/api';
import { 
  StyledInput, 
  StoreSection,
  StoreListSection,
  StoreText,
  Search,
  SearchSection
 } from './Store.style';

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
      setIsObserverActive(true);
      if (searchTerm.trim() === '') {
        await fetchData(page);
      } else {
        await fetchData(page, searchTerm);
      }
    };
    fetchDataAndActivateObserver();
  }, [page, searchTerm]);

  const fetchData = async (page: number, searchTerm?: string) => {  
    try {
      let url = `/v1/store?page=${page}`;     
      if (searchTerm && searchTerm.trim() !=='') {
        url += `&search=${searchTerm}`;
      } 
      console.log(url)
      const response = await axiosInstance.get(url);
    const { storeInfoList, pageInfo } = response.data;
    console.log(storeInfoList);
      if (page === 1) {
        setFilteredData(storeInfoList);
      } else {
        setFilteredData((prevData) => [...prevData, ...storeInfoList]);
      }
      if (page === pageInfo.totalPage) {
        setIsObserverActive(false);
        //무한 스크롤 중단.
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
