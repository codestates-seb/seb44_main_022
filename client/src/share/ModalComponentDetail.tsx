import { useState, useEffect } from 'react';
import modal_cart from '../assets/images/img_modal/modal_cart.png';
import modal_cake from '../assets/images/img_modal/modal_cake.png';
import ProductCartAlert from '../share/ProductCartAlert';
import axiosInstance from '../api/apis';
import {
ModalProps, Product
} from '../assets/interface/Store.interface';
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
  ProductsContainer,
  StoreName,
  ProductName,
  ProductDetail,
  ProductPrice,
  ProductImgContainer,
  ModalWrapper
} from './ModalComponentDetail.style';
import ModalContainers from './ModalContainers';


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
  const [product, setProduct] = useState<Product | null>(null);    
  const fetchData = async () => {  
        try {
          const url = `/store/${storeId}/${productId}`;
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
    <ModalContainers>
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
            <ProductsContainer>
              <StoreName>{storeName}</StoreName>
              <ProductName>{product?.productName}</ProductName>
              <ProductDetail>
              {product?.productIntroduction}
              </ProductDetail>
              <ProductPrice>{product?.productPrice}원</ProductPrice>
            </ProductsContainer>
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
    </ModalContainers>
  );
}

export default ModalComponentDetail;
