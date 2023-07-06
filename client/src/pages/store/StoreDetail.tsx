import styled from 'styled-components';
// interface Store {
//     id: number;
//     store_title: string;
//     store_phone: string;
//     store_address: string;
//     store_time: string;
//     store_image_url: string;
//     menu: {
//       custom: CustomProduct[];
//     };
//   }
  
//   interface CustomProduct {
//     product_name: string;
//     product_img: string;
//     product_detail: string;
//   }
function StoreDetail() {  
  

 /*const fetchData = async (page: number, searchTerm?: string) => {  
    try {
      let url = `https://db5037e1-137a-4d2b-a379-6d6866a8a0b5.mock.pstmn.io/store?page=${page}&limit=${itemsPerPage}`;
     
      if (searchTerm && searchTerm.trim() !=='') {
        url += `&search=${searchTerm}`;
      } 
      console.log(url)
      const response = await axios.get(url);
      const data = response.data;
      if (page === 1) {
        setFilteredData(data);
      } else {
        setFilteredData((prevData) => [...prevData, ...data]);
      }
    } catch (error) {
      console.error('Error fetching store data:', error);
    }
  };*/
    
  return (
    <>
        <StoreDetailSection>
            <StoreDetails>
                <div style={{backgroundImage:"url('https://images.unsplash.com/photo-1583338917451-face2751d8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80')", width: '15rem', height: '15rem', borderRadius: '50%', backgroundSize:'cover'}}></div>
                <div style={{marginLeft:'8rem'}}>
                    <h3 style={{fontWeight:'600', fontSize: '18px', color: 'var(--bright-black)', marginBottom: '1rem'}}>해피할리</h3>
                    <Detail>전화번호</Detail>
                    <DetailInfo>0103242333</DetailInfo>
                    <Detail>주소</Detail><span style={{color: 'var(--light-gray)', fontSize: '13px'}}>[지도보기]</span>
                    <DetailInfo>서울 송파구 어쩌구 고분로 3길</DetailInfo>                    
                    <Detail>영업시간</Detail>
                    <span style={{ color: 'var(--bright-black)',fontWeight: '500',fontSize: '13px'}}>09:00-12:00</span>
                </div>
            </StoreDetails>
        </StoreDetailSection>
        <StoreProductSection>
            <div style={{width: '80%'}}>
                <ProductTitle>Custom</ProductTitle>
                <ProductTitle>We Made It</ProductTitle>
            </div>
        </StoreProductSection>
    </>
  );
}

const StoreProductSection = styled.section`
display: flex;
flex-direction: column;
align-items: center;
`
const ProductTitle = styled.h4`
color: var(--gold);
font-weight: 700;
`
const StoreDetails = styled.section`
margin-top: 14rem;
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 5rem;
`

const StoreDetailSection = styled.section`
margin-bottom: 4rem;
display: flex;
flex-direction: column;
align-items: center;
    &::after {
    content:"";
    display: block;
    background-color: var(--light-gray);
    height: 1.4px;
    width: 80%;
    margin-top: 20px;
  }
`

const DetailInfo = styled.p`
    color: var(--bright-black);
    font-weight: 400;
    font-size: 13px;
    margin-top: 10px;
    margin-bottom: 20px;
`

const Detail = styled.span`
    color: var(--light-gray);
    font-size: 13px;
    margin-right: 5px;
    font-weight: 600;
`

export default StoreDetail;