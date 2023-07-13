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

function Store() {  
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  console.log(searchTerm)
  //search된 단어가 여기 담김
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  console.log(`filtered:${filteredStores}`)
  //여긴 뭐임? fetch되어 들어온 데이터 담는 곳
  const [searchResult, setSearchResult] = useState<Store[]>([]);
  const [page, setPage] = useState(1);
  //페이지 1부터 시작됨 
  const [isObserverActive, setIsObserverActive] = useState(false); 
  //observer 켰다가 껐다가 하는 기준
  const [isSearchEventTriggered, setIsSearchEventTriggered] = useState(false);
  //searchEvent가 발생하는지 추적함.
  const target = useRef<HTMLDivElement>(null);
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  };

  useEffect(() => {
    //observe 되고 있는 거 
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      //감지 대상 각각을 받아온다. 얘네가 감지될 때 page+1을 시킨다.
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
    };
    const observer = new IntersectionObserver(handleObserver, options);
    //관찰자 생성 및 관찰 대상 요소의 변경 감지.
    if (target.current&& isObserverActive) {
      observer.observe(target.current);
      setIsObserverActive(true); 
    }
    return () => {
      observer.disconnect();
      //컴포넌트가 언마운트되거나 isObserverActive가 변경될 때 Intersection Observer를 정리하고 해제
    };
  }, [isObserverActive]);

  useEffect(() => {
    const fetchDataAndActivateObserver = async () => {
      //page번호나 searchTerm이 변할 때마다 데이터를 가져오고 관찰자를 활성화한다.
     
      if (searchTerm.trim() === '') {
        await fetchData(page);
        //비어있는 경우에는 현재 page에 해당하는 데이터를 가져온다.
      } else {
        await fetchData(1, searchTerm);
        //비어있지 않은 경우에는 현재 page와 검색어를 모두 사용해 데이터를 가져온다.
        //여기서 걍 searchTerm을 보내면 안됨? 
      } setIsObserverActive(true);
    };
    fetchDataAndActivateObserver();
    //처음 렌더링 됐을 때 한번 실행, 이후 의존성 배열 내부의 상태들이 변경될 때에만 실행.
  }, [page, searchTerm]);

  const fetchData = async (page: number, searchTerm?: string) => {  
    //데이터 axios로 받아오는 함수 
    try {
      setLoading(true);
      let url = `/v1/store?page=${page}`;     
      if (searchTerm && searchTerm.trim() !=='') {
        //searchTerm이 존재하고, 공백이 아닌 경우에만 url에 search를 붙여 GET한다.
        url += `&search=${searchTerm}`;
      } 
    console.log(url)
    const response = await axiosInstance.get(url);
    const { storeInfoList, pageInfo } = response.data;
    //받아서 가져온 data를 storeInfoList와 PageInfo로 나눈다.
    console.log(storeInfoList, pageInfo);
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
  
      if (page === pageInfo.totalPage) {
        setIsObserverActive(false);
      }
  
      setLoading(false);
    } catch (error) {
      console.error('Error fetching store data:', error);
      setLoading(false);
    }
  };
    
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSearchEventTriggered(true)
    setSearchTerm(e.target.value);
    if(e.target.value===''){
      showAll()
    }
    //검색이 활성화되고, change가 발생할 때에만 searchTerm을 현재 감지된 value로 바꿔준다.
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    //Enter가 눌릴 때만 search()를 실행한다.
    if (e.key === 'Enter') {
      setIsSearchEventTriggered(true);
      handleSearch();
    }
  };

  const handleSearch = () => {
    setIsSearchEventTriggered(true);
    if (searchTerm.trim() === '') {
      //searchTerm이 공백일 시 데이터를 전체 다 보여준다.
      showAll();
    } else {
      //공백이 아닐 시 page를 1로 세팅하고 page1과 searchTerm을 담아서 보낸다.
      setPage(1);
      fetchData(1, searchTerm);
    }
  };

  const showAll = () => {
    setIsSearchEventTriggered(false);
    setSearchResult([]);
    setFilteredStores([]);
    setSearchTerm('');
    setPage(1);    
    fetchData(1);
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
            {loading ? (
            <Loading/>
          ) : (
            <>
              <StoreCard data= {searchTerm.trim() !== '' ? searchResult : filteredStores} />
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
