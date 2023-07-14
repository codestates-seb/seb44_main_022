import { FaSearch } from 'react-icons/fa';
import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react';
import StoreCard from '../../components/storeCard';
import axiosInstance from '../../api/api';
import { 
  StyledInput, 
  StoreSection,
  StoreListSection,
  StoreText,
  Search,
  SearchSection,
  Loading
 } from './Store.style';

interface Store {
  storeId: number;
  storeName: string;
  storeAddress: string;
  storeImage: string;
}

interface PageInfo {
  currentPage: number;
  totalPage: number;
}

function Store() {  
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [searchResult, setSearchResult] = useState<Store[]>([]);
  const [page, setPage] = useState(1);
  const [isObserverActive, setIsObserverActive] = useState(false); 
  const [isSearchEventTriggered, setIsSearchEventTriggered] = useState(false);
  const [pageInfo, setPageInfo] = useState<PageInfo>({ currentPage: 0, totalPage: 0 });
  const target = useRef<HTMLDivElement>(null);
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  };

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !loading && page !== pageInfo.totalPage) {
          setPage((prevPage) => prevPage + 1);
          observer.unobserve(entry.target)
        }
      });
    };
    
    const observer = new IntersectionObserver(handleObserver, options);
    if (target.current && isObserverActive) {
      observer.observe(target.current);
      setIsObserverActive(true); 
    }
    return () => {
      observer.disconnect();
      setIsObserverActive(false)
    };
  }, [isObserverActive, loading, page, pageInfo]);

  useEffect(() => {
    const fetchDataAndActivateObserver = async () => {
      if (searchTerm.trim() === '') {
        await fetchData(page);
      } else {
        await fetchData(1, searchTerm);
      } 
      setIsObserverActive(true);
    };
    fetchDataAndActivateObserver();
  }, [page, isSearchEventTriggered]);

  
  const fetchData = async (page: number, searchTerm?: string) => {  
    try {
      setLoading(true);
      setIsLoadingMore(page > 1);
      let url = `/v1/store?page=${page}`;     
      if (searchTerm && searchTerm.trim() !=='') {
        url += `&search=${searchTerm}`;
      } 
    const response = await axiosInstance.get(url);
    const { storeInfoList, pageInfo } = response.data;
    console.log(url)
    console.log(storeInfoList);
    console.log(pageInfo)
    if (searchTerm && searchTerm.trim() !== '') {
      if (page === 1) {
        setFilteredStores(storeInfoList);
        setSearchResult(storeInfoList);
      } else {
        setFilteredStores((prevData) => [...prevData, ...storeInfoList]);
        setSearchResult(storeInfoList);
      }
    } else {
      setFilteredStores((prevData) => [...prevData, ...storeInfoList]);      
    }       
    setPageInfo(pageInfo);
    setLoading(false);
    setIsLoadingMore(false);
      if (page === pageInfo.totalPage) {
        setIsObserverActive(false);        
      }  else {
        setIsObserverActive(true); 
      } 
    } catch (error) {
      console.error('Error fetching store data:', error);
      setLoading(false);
      setIsLoadingMore(false);
    }
  };


  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if(e.target.value===''){
      showAll();
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsSearchEventTriggered(true);
    }
  };
  
  const handleSearch = () => {
    setIsSearchEventTriggered(true);
  };

  useEffect(() => {
    if (isSearchEventTriggered) {
      if (searchTerm.trim() === '') {
        showAll();
      } else {
        setPage(1);        
      }
      setIsSearchEventTriggered(false);
    }
  }, [isSearchEventTriggered,]);
  

  //완전히 page=1의 정보로 모든 걸 초기화 시키는 세팅.
  const showAll = () => {
    setIsSearchEventTriggered(false);
    setFilteredStores([]);
    setSearchResult([]);
    setSearchTerm('');
    setPage(1);   
    fetchData(1)
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
                  onKeyPress={handleKeyPress}
                  onChange={handleSearchChange} 
                />
              </div>        
            </Search>
          </SearchSection>
          <StoreListSection>
          {loading && !isLoadingMore ? (
          <Loading />
          ) : (
            <>
              <StoreCard data={searchTerm.trim() !== '' ? searchResult : filteredStores} />
              {isLoadingMore && <Loading />} 
              <div ref={target}></div>
          </>
           )}
          </StoreListSection>      
        </section>
      </StoreSection>
    </>
  );
}
export default Store;
