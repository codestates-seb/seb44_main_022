import Modal from 'react-modal';
import axios from 'axios';
import styled, {css} from 'styled-components';
import { useState } from 'react';
import modal_cart from '../assets/images/img_modal/modal_cart.png';
import modal_cake from '../assets/images/img_modal/modal_cake.png';
import ProductCartAlert from '../share/ProductCartAlert';

//해야하는 것: 처음 제품을 눌렀을 때 api요청으로 해당 상폼 관련 데이터 받아오기, 이후 뿌려주기
//useEffect?
interface ProductImgContainerProps {
  backgroundImage: string | undefined;
}
const ProductData = {
  "memberId": 1,
  "storename": "세상제일제과점",
  "productInfoList": [
          {
              "productId": 1,
              "productImage": "https://plus.unsplash.com/premium_photo-1668784193175-b16306c81100?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
              "productName": "옐로우 스마일",
              "productPrice": 22000,
              "productType": "STANDARD",
              "productDetail": "입안에서 살살 녹는 옐로우 스마일 쿠키. 웃고 있는 쿠키 모양을 본따서 만들었기 때문에 즐거움을 줄 수 있습니다."
          },
          {
              "productId": 2,
              "productImage": "https://images.unsplash.com/photo-1506184341422-6cc152ae474b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
              "productName": "마시멜로",
              "productPrice": 35000,
              "productType": "STANDARD",
              "productDetail": "부드러워진 젤라틴, 포도당, 계란 흰자, 조미료 등으로 거품을 일으킨 다음 설탕이나 콘 시럽, 물로 굳혀서 만드는 스펀지 형태의 폭신폭신한 사탕류 식품이다. 식용 색소를 넣어 색깔을 입히는 경우도 있다. "
          },
          {
            "productId": 3,
            "productImage": "https://images.unsplash.com/photo-1562777717-dc6984f65a63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
            "productName": "달콤사탕",
            "productPrice": 8000,
            "productType": "STANDARD",
            "productDetail": "세상에서 제일 달콤한 사탕을 맛보세요!"
        },
        {
          "productId": 4,
          "productImage": "https://plus.unsplash.com/premium_photo-1675881736302-af0425d8b9c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
          "productName": "쿠키 & 초코파이",
          "productPrice": 15000,
          "productType": "STANDARD",
          "productDetail": "체적으로 크라운보다 더 달고 뻑뻑하며, 마시멜로가 쫄깃하다. 오리온 초코파이 항목에서 언급된 원조 상품인 미국의 문파이랑 비슷한 맛이라 생각하면 될 듯 하다."
      },
        {
          "productId": 5,
          "productImage": "https://images.unsplash.com/photo-1629196256546-ff4f3e27f623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
          "productName": "쿠키",
          "productPrice": 5300,
          "productType": "STANDARD",
          "productDetail": "갓 구워내 바삭바삭한 엄마 손맛 쿠키."
       },
       {
        "productId": 6,
        "productImage": "https://images.unsplash.com/photo-1629196256546-ff4f3e27f623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        "productName": "쿠키",
        "productPrice": 5300,
        "productType": "STANDARD",
        "productDetail": "갓 구워내 바삭바삭한 엄마 손맛 쿠키."
     },
     {
      "productId": 7,
      "productImage": "https://images.unsplash.com/photo-1629196256546-ff4f3e27f623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "productName": "쿠키",
      "productPrice": 5300,
      "productType": "STANDARD",
      "productDetail": "갓 구워내 바삭바삭한 엄마 손맛 쿠키."
   }
      ]
}

interface Product {
  productId: number;
  productImage: string;
  productName: string;
  productPrice: number;
  productType: string;
}
interface ModalComponentDetailProps {
  product: Product;
  closeModal: () => void;
  storeId: string;
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
  productId,
}: ModalProps){  

  const [isProductCartAlertVisible, setProductCartAlertVisible] = useState(false);
  const product = ProductData.productInfoList.find(item => item.productId === parseInt(productId));
  const handleSubmit = async () => {
    const formData = {
      storeId: storeId,
      productId: productId,
    };
    try {
      await axios.post('/api/post-endpoint', formData);
      //axios 주소 바꿔치기
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
            <StoreName>{ProductData.storename}</StoreName>
            <ProductName>{product?.productName}</ProductName>
            <ProductDetail>
            {product?.productDetail}
            </ProductDetail>
            <ProductDetailTwo>{product?.productPrice}원</ProductDetailTwo>
          </Product>
          <TextContainer>
            <Text>Sweet</Text>
            <Text>Delicious</Text>
            <Text>Fresh</Text>
          </TextContainer>
          <CircleShape />
          <Rectangle />          
          <ModalButtons>
            <CloseButton onClick={onRequestClose}>X</CloseButton>
            <ImageBox>
              <Image src={modal_cake} alt="Cart" />
            </ImageBox>
            <CartButton onClick={handleSubmit}>
              <CartImage src={modal_cart} alt="Cart" />
              <CartButtonText >장바구니 담기</CartButtonText>
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

const AlertBox= styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
`
const CircleShape = styled.div`
  position: absolute;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background-color: rgba(49, 129, 97, 0.25);
  box-shadow: 10px 14px 104px rgba(0, 0, 0, 0.12);
  filter: blur(100px);
  top: 150px;
  left: calc(15%);
`;
const Rectangle = styled.div`
  position: absolute;
  width: 100px;
  height: 700px;
  background-color: #f9e1c3;
  box-shadow: 10px 14px 104px rgba(0, 0, 0, 0.12);
  filter: blur(100px);
  transform: rotate(38.26deg);
  transform-origin: 0 0;
  top: 20px;
  left: calc(82%);
`;
const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Text = styled.h2`
  font-family: 'Open Sans', cursive;
  font-size: 15px;
  margin: 28px;
  margin-bottom: 70px;
  color: var(--light-black);
`;
const Title = styled.h3`
  font-family: 'Just Another Hand', cursive;
  margin-bottom: 20px;
  font-size: 40px;
  align-self: flex-end;
  position: absolute;
  left: 50px;
  top: 30px;
  color: var(--light-black);
`;

const StyledModal = styled(Modal)`
  ${({ isOpen }) =>
    isOpen &&
    css`
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      min-height: 77%;
      min-width: 77%;
      border-radius: 40px;
      box-shadow: 0px 8px 24px rgba(49, 70, 86, 0.12);
      background-color: rgba(255, 255, 255, 0.9);
      z-index: 10;
      outline: none;
      border: none;
    `}
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;
const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ModalButtons = styled.div`
  align-self: flex-end;
  padding: 10px;
  margin-top: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  width: 70px;
  height: 50px;
  top: 0px;
  right: 0px;
  padding: 10px;
  border: none;
  background-color: rgba(20, 46, 56, 0.9);
  color: white;
  border-radius: 0px 40px 0px 0px;
`;

const CartButton = styled.button`
  position: absolute;
  width: 115px;
  height: 75px;
  bottom: 0px;
  right: 0px;
  padding: 10px;
  border: none;
  background-color: transparent;
  border: 1px solid var(--light-black);
  border-radius: 0px 0px 40px 0px;
  background-color: rgba(20, 46, 56, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Line = styled.div`
  width: 1px;
  height: 160px;
  background-color: rgba(20, 46, 56, 0.7);
  margin-top: 250px;
  margin-right: 15px;
`;
const CartImage = styled.img`
  width: 30px;
  height: 30px;
  margin-bottom: 8px;
`;
const CartButtonText = styled.span`
  color: var(--white);
  font-size: 6px;
`;

const ImageBox = styled.div`
  position: absolute;
  background-color: #fab65d;
  width: 155px;
  height: 75px;
  bottom: 0px;
  right: 115px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px 0px 0px 0px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
`;

const Product = styled.div`
  position: absolute;
  top: 9rem;
  left: 10%;
  display: block;
  width: 40%;
  > * + * {
    margin-top: 40px;
  }
`;
const StoreName = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Open Sans', cursive;
  font-weight: 500;
  font-size: 15px;
  color: #244030;
  border-radius: 214px;
  background-color: #dcd2bd;
  border: none;
  width: 300px;
  height: 30px;
`;
const ProductName = styled.h2`
  font-family: 'Open Sans', cursive;
  font-size: 45px;
  font-weight: bold;
  color: var(--light-black);
  margin-left: 2rem;
`;
const ProductDetail = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: var(--light-black);
  width: 400px;
  line-height: 1.7;
`;
const ProductDetailTwo = styled.h2`
  display: flex;
  font-size: 19px;
  color: var(--white);
  background-color: #665d49;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 300px;
  padding: 18px;
`;

const ProductImgContainer = styled.div<ProductImgContainerProps>`
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translate(0, -50%);
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background-color: #fab65d;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ backgroundImage }) =>
    css`
      background-image: url(${backgroundImage});
      background-repeat: no-repeat;
      background-size: cover;
    `}
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;