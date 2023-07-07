import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import modal_cart from '../assets/images/img_modal/modal_cart.png';
import modal_cake from '../assets/images/img_modal/modal_cake.png';
import modal_ex from '../assets/images/img_modal/modal_ex.png';

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
}

interface ModalProps extends ModalComponentDetailProps {
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
  children: React.ReactNode;
  overlay?: boolean;
}

function ModalComponentDetail({
  isOpen,
  onRequestClose,
  contentLabel,
  children
}: ModalProps ){
  return (
    <div>
      {isOpen && <Overlay />}
      <StyledModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel={contentLabel}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        overlayClassName="overlay"
      >
        <ModalContainer>
          <Title>BUYTE</Title>
          <Product>
            <StoreName>매장 이름</StoreName>
            <ProductName>제품 이름</ProductName>
            <ProductDetail>
              제품설명제품설명제품설명제품설명제품설명제품설명제품설명제품설명제품설명
            </ProductDetail>
            <ProductDetailTwo>ProductDetailTwo</ProductDetailTwo>
          </Product>
          <TextContainer>
            <Text>Sweet</Text>
            <Text>Delicious</Text>
            <Text>Fresh</Text>
          </TextContainer>
          <CircleShape />
          <Rectangle />
          <ModalContent>{children}</ModalContent>
          <ModalButtons>
            <CloseButton onClick={onRequestClose}>X</CloseButton>
            <ImageBox>
              <Image src={modal_cake} alt="Cart" />
            </ImageBox>
            <CartButton>
              <CartImage src={modal_cart} alt="Cart" />
              <CartButtonText>장바구니 담기</CartButtonText>
            </CartButton>
            <Line />
          </ModalButtons>
          <ProductImgContainer>
            <ProductImg src={modal_ex} alt="Example" />
          </ProductImgContainer>
        </ModalContainer>
      </StyledModal>
    </div>
  );
}

export default ModalComponentDetail;



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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 77%;
  min-width: 77%;
  border-radius: 40px;
  box-shadow: 0px 8px 24px rgba(49, 70, 86, 0.12);
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 10;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9;
`;
const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ModalContent = styled.div`
  flex: 1;
  overflow: auto;
  padding: 10px;
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
  right: calc(10%);
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
  top: 30%;
  left: 10%;
  display: block;
  width: 30%;

  > * + * {
    margin-top: 40px;
  }
`;
const StoreName = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Open Sans', cursive;
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
`;
const ProductDetail = styled.h2`
  font-family: 'Open Sans', cursive;
  font-size: 15px;
  color: var(--light-black);
`;
const ProductDetailTwo = styled.h2`
  display: flex;
  font-family: 'Open Sans', cursive;
  font-size: 15px;
  color: var(--white);
  background-color: #665d49;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 180px;
  height: 35px;
`;

const ProductImgContainer = styled.div`
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
`;

const ProductImg = styled.img`
  width: 400px;
  height: 400px;
`;
