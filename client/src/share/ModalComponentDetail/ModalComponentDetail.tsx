import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import modal_cart from '../../assets/images/img_modal/modal_cart.png';
import modal_cake from '../../assets/images/img_modal/modal_cake.png';
import axiosInstance from '../../api/apis';
import { ModalProps, Product } from '../../assets/interface/Store.interface'
import { priceFormatter } from '../../pages/mypage/PriceFormatter';
import ProductCartAlert from '../ProductCartAlert/ProductCartAlert';
import ModalPortal from '../ModalPortal';
import { LocalStorage } from '../../utils/browserStorage';
import { LOCAL_STORAGE_KEY_LIST } from '../../assets/constantValue/constantValue';
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
} from './ModalComponentDetail.style';

function ModalComponentDetail({
  isOpen,
  onRequestClose,
  contentLabel,
  closeModal,
  storeId,
  storeName,
  productId,
}: ModalProps) {
  const [isProductCartAlertVisible, setProductCartAlertVisible] = useState(false);
  const [product, setProduct] = useState<Product | null>(null); 
  const navigate = useNavigate();
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
      
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formData = {
      storeId: storeId,
      productId: productId,
    };
    const url = `/store/${storeId}/${productId}`;
    const accessToken = LocalStorage.get(LOCAL_STORAGE_KEY_LIST.AccessToken);
    if (accessToken) {
    await axiosInstance
      .post(url, formData)
      .then(() => {
        setProductCartAlertVisible(true);
        console.log('POST 요청 성공');
      })
      .catch((error) => {
        console.error('POST 요청 실패:', error);
      });
  } else {
    alert('로그인 먼저 해주세요!')
    console.log('비회원 주문 처리')
    navigate('/auth');
  }
}
  const handleOverlayClick = () => {
    closeModal();
  };

  return (
    <ModalPortal>
      <Overlay onClick={handleOverlayClick} isOpen={isOpen} />
      <StyledModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel={contentLabel}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        overlayClassName="overlay"
      >
        <AlertBox>
          {isProductCartAlertVisible && <ProductCartAlert closeModal={closeModal} />}
        </AlertBox>
        <ModalContainer>
          <Title>BUYTE</Title>
          <ProductsContainer>
            <StoreName>{storeName}</StoreName>
            <ProductName>{product?.productName}</ProductName>
            <ProductDetail>{product?.productIntroduction}</ProductDetail>
            <ProductPrice>{product ? priceFormatter(product.productPrice) : ''}원</ProductPrice>
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
              <img src={modal_cake} style={{ width: '50px', height: '50px' }} alt="Cart" />
            </ImageBox>
            <CartButton onClick={handleSubmit}>
              <img
                src={modal_cart}
                style={{ width: '30px', height: '30px', marginBottom: '8px' }}
                alt="Cart"
              />
              <span style={{ color: 'var(--white)', fontSize: '6px' }}>장바구니 담기</span>
            </CartButton>
            <Line />
          </ModalButtons>
          <ProductImgContainer backgroundImage={product?.productImage} />
        </ModalContainer>
      </StyledModal>
    </ModalPortal>
  );
}

export default ModalComponentDetail;
