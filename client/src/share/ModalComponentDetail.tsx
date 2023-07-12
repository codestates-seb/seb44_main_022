import { useState, useEffect } from 'react';
import modal_cart from '../assets/images/img_modal/modal_cart.png';
import modal_cake from '../assets/images/img_modal/modal_cake.png';
import ProductCartAlert from '../share/ProductCartAlert';
import axiosInstance from '../api/api';
import {
  AlertBox,
  CircleShape,
  Rectangle,
  DecorationTextContainer,
  DecorationText,
  Title,
  StyledModal,
  Overlay,
  ModalContainer,
  ModalButtons,
  CloseButton,
  CartButton,
  Line,
  ImageBox,
  Product,
  StoreName,
  ProductName,
  ProductDetail,
  ProductPrice,
  ProductImgContainer,
  ModalWrapper
} from './ModalComponentDetail.style';
/*const ProductData = {
  "productInfoList": [
          {
              "productId": 1,
              "productImage": "https://plus.unsplash.com/premium_photo-1668784193175-b16306c81100?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
              "productName": "옐로우 스마일",
              "productPrice": 22000,
              "productType": "STANDARD",
              "productIntroduction": "입안에서 살살 녹는 옐로우 스마일 쿠키. 웃고 있는 쿠키 모양을 본따서 만들었기 때문에 즐거움을 줄 수 있습니다."
          },
          {
              "productId": 2,
              "productImage": "https://images.unsplash.com/photo-1506184341422-6cc152ae474b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
              "productName": "마시멜로",
              "productPrice": 35000,
              "productType": "STANDARD",
              "productIntroduction": "부드러워진 젤라틴, 포도당, 계란 흰자, 조미료 등으로 거품을 일으킨 다음 설탕이나 콘 시럽, 물로 굳혀서 만드는 스펀지 형태의 폭신폭신한 사탕류 식품이다. 식용 색소를 넣어 색깔을 입히는 경우도 있다. "
          },
          {
            "productId": 3,
            "productImage": "https://images.unsplash.com/photo-1562777717-dc6984f65a63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
            "productName": "달콤사탕",
            "productPrice": 8000,
            "productType": "STANDARD",
            "productIntroduction": "세상에서 제일 달콤한 사탕을 맛보세요!"
        },
        {
          "productId": 4,
          "productImage": "https://plus.unsplash.com/premium_photo-1675881736302-af0425d8b9c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
          "productName": "쿠키 & 초코파이",
          "productPrice": 15000,
          "productType": "STANDARD",
          "productIntroduction": "체적으로 크라운보다 더 달고 뻑뻑하며, 마시멜로가 쫄깃하다. 오리온 초코파이 항목에서 언급된 원조 상품인 미국의 문파이랑 비슷한 맛이라 생각하면 될 듯 하다."
      },
            {
              "productId": 5,
              "productImage": "https://images.unsplash.com/photo-1629196256546-ff4f3e27f623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
              "productName": "쿠키",
              "productPrice": 5300,
              "productType": "STANDARD",
              "productIntroduction": "갓 구워내 바삭바삭한 엄마 손맛 쿠키."
          },
          {
            "productId": 6,
            "productImage": "https://images.unsplash.com/photo-1629196256546-ff4f3e27f623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
            "productName": "쿠키",
            "productPrice": 5300,
            "productType": "STANDARD",
            "productIntroduction": "갓 구워내 바삭바삭한 엄마 손맛 쿠키."
        },
        {
          "productId": 7,
          "productImage": "https://images.unsplash.com/photo-1629196256546-ff4f3e27f623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
          "productName": "쿠키",
          "productPrice": 5300,
          "productType": "STANDARD",
          "productIntroduction": "갓 구워내 바삭바삭한 엄마 손맛 쿠키."
      }
      ]
}  //서버와 통신시 지워야 하는 부분
*/

interface Product {
  productId: number;
  productImage: string;
  productName: string;
  productType: string;
  productIntroduction: string;
  productPrice: number;
}
interface ModalComponentDetailProps {
  product: Product;
  closeModal: () => void;
  storeId: string;
  storeName: string
  productId: string;
}

interface ModalProps extends ModalComponentDetailProps {
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
  overlay?: boolean;
}

function ModalComponentDetail({
  isOpen,
  onRequestClose,
  contentLabel,
  closeModal,
  storeId,
  storeName,
  productId,
}: ModalProps){  

  const [isProductCartAlertVisible, setProductCartAlertVisible] = useState(false);
  // const product = ProductData.productInfoList.find(item => item.productId === parseInt(productId));
  const [product, setProduct] = useState<Product | null>(null);    
  const fetchData = async () => {  
        try {
          const url = `/v1/store/${storeId}/${productId}`;
          const response = await axiosInstance.get(url);      
          const data = response.data;    
          setProduct(data);
        } catch (error) {
          console.error('Error fetching store data:', error);
        }
      };

    useEffect(() => {
        fetchData();
      }, []);

  const handleSubmit = async () => {
    const formData = {
      storeId: storeId,
      productId: productId,
    };
    try {
      const url= `/store/${storeId}/${productId}`;
      await axiosInstance.post(url, formData);
      setProductCartAlertVisible(true);
      console.log('POST 요청 성공');
    } catch (error) {
      console.error('POST 요청 실패:', error);
    }
  };
  const handleOverlayClick = () => {
    closeModal();
  };

  return (
    <ModalWrapper>
      <Overlay onClick={handleOverlayClick} isOpen={isOpen}/>    
      <StyledModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel={contentLabel}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        overlayClassName="overlay"      
        >
        <AlertBox>
         {isProductCartAlertVisible &&<ProductCartAlert closeModal={closeModal}/>}
        </AlertBox>       
        <ModalContainer>
          <Title>BUYTE</Title>
          <Product>
            <StoreName>{storeName}</StoreName>
            <ProductName>{product?.productName}</ProductName>
            <ProductDetail>
            {product?.productIntroduction}
            </ProductDetail>
            <ProductPrice>{product?.productPrice}원</ProductPrice>
          </Product>
          <DecorationTextContainer>
            <DecorationText>Sweet</DecorationText>
            <DecorationText>Delicious</DecorationText>
            <DecorationText>Fresh</DecorationText>
          </DecorationTextContainer>
          <CircleShape />
          <Rectangle />          
          <ModalButtons>
            <CloseButton onClick={onRequestClose}>X</CloseButton>
            <ImageBox>
              <img src={modal_cake} style={{width: '50px', height: '50px'}} alt="Cart" />
            </ImageBox>
            <CartButton onClick={handleSubmit}>
              <img src={modal_cart} style={{width: '30px', height: '30px', marginBottom:'8px'}} alt="Cart" />
              <span style={{color: 'var(--white)', fontSize: '6px'}}>장바구니 담기</span>
            </CartButton>
            <Line />
          </ModalButtons>
          <ProductImgContainer backgroundImage={product?.productImage}/>
        </ModalContainer>
      </StyledModal>
    </ModalWrapper>
  );
}

export default ModalComponentDetail;
