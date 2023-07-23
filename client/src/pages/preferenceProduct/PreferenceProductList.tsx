import { useState, useEffect, useRef} from 'react';
import ProductCard from '../../components/Cards/RecommandProductCard';
import axiosInstance from '../../api/apis';
import { Product, PageInfo } from '../../assets/interface/Product.interface';
 import { 
  Loading,
  SearchSection,
  Search
 } from '../store/StoreList.style';
import { 
  ProductSection,
  ProductText,
  ProductListSection
 } from './PreferenceProduct.style';

function PreferenceProductList() {  
  const [loading, setLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState<PageInfo>({ currentPage: 0, totalPage: 0 });
  console.log(filteredProducts);
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
    if (target.current) {
      observer.observe(target.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [loading, page, pageInfo]);


  useEffect(() => {
    const fetchDataAndActivateObserver = async () => {
        await fetchData(page);
    };
    fetchDataAndActivateObserver();
  }, [page]);

  
  const fetchData = async (page: number) => {  
    try {
      setLoading(true);
      setIsLoadingMore(page > 1);
      const url = `/product?page=${page}`;     
    const response = await axiosInstance.get(url);
    const { preferenceProductList, pageInfo } = response.data;    
      if (page === 1) {
        setFilteredProducts(preferenceProductList);
      } else {
        setFilteredProducts((prevData) => [...prevData, ...preferenceProductList]);
      }

    setPageInfo(pageInfo);
    setLoading(false);
    setIsLoadingMore(false);
    } catch (error) {
      console.error('Error fetching product data:', error);
      setLoading(false);
      setIsLoadingMore(false);
    }
  };


  return (
    <>
      <ProductSection >
        
        <section style={{ width: '70%'}}>    
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ProductText>
              
              <h2>Specials</h2>
              <p>BUYTE만의 특색있는 커스텀 제품들을 만나보세요!</p>
            </ProductText>
          </div>
          <SearchSection>
            <Search>
              <span>추천제품 목록</span>
            </Search>
          </SearchSection>
          <ProductListSection>
          {loading && !isLoadingMore ? (
          <Loading />
          ) : (
            <>
              <ProductCard data={filteredProducts} />
              {isLoadingMore && <Loading />} 
              <div ref={target} ></div>
          </>
           )}
          </ProductListSection>      
        </section>
      </ProductSection>
    </>
  );
}
export default PreferenceProductList;
