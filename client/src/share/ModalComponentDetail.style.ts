import styled, {css} from 'styled-components';
import Modal from 'react-modal';
import {ProductImgContainerProps} from '../assets/interface/Store.interface'

export const AlertBox= styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
`
export const CircleShape = styled.div`
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

export const Rectangle = styled.div`
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

export const DecorationTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const DecorationText = styled.h2`
  font-family: 'Open Sans', cursive;
  font-size: 15px;
  margin: 28px;
  margin-bottom: 70px;
  color: var(--light-black);
  @media (max-width: 910px) {
    opacity: 0;
    }
`;
export const Title = styled.h3`
  font-family: 'Just Another Hand', cursive;
  margin-bottom: 20px;
  font-size: 40px;
  align-self: flex-end;
  position: absolute;
  left: 50px;
  top: 30px;
  color: var(--light-black);
`;

export const StyledModal = styled(Modal)` 

  ${({ isOpen }) =>
    isOpen &&
    css`
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      min-height: 77%;
      min-width: 77%;
      border-radius: 20px;
      box-shadow: 0px 8px 24px rgba(49, 70, 86, 0.12);
      background-color: rgba(255, 255, 255, 0.9);
      z-index: 100;
      outline: none;
      border: none;
    `}
`;

export const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ModalButtons = styled.div`
  align-self: flex-end;
  padding: 10px;
  margin-top: auto;
`;

export const CloseButton = styled.button`
  position: absolute;
  width: 70px;
  height: 50px;
  top: 0px;
  right: 0px;
  padding: 10px;
  border: none;
  background-color: rgba(20, 46, 56, 0.9);
  color: white;
  border-radius: 0px 20px 0px 0px;
`;

export const CartButton = styled.button`
  position: absolute;
  width: 115px;
  height: 75px;
  bottom: 0px;
  right: 0px;
  padding: 10px;
  border: none;
  background-color: transparent;
  border: 1px solid var(--light-black);
  border-radius: 0px 0px 20px 0px;
  background-color: rgba(20, 46, 56, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const Line = styled.div`
  width: 1px;
  height: 160px;
  background-color: rgba(20, 46, 56, 0.7);
  margin-top: 250px;
  margin-right: 15px;
`;
export const ImageBox = styled.div`
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

export const ProductsContainer = styled.div`
  position: absolute;
  top: 9rem;
  left: 10%;
  display: block;
  width: 40%;
  > * + * {
    margin-top: 40px;
  }
  @media (max-width: 910px) {
    >*+*{
      margin-top: 30px
    }
    }
`;
export const StoreName = styled.h2`
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
  @media (max-width: 910px) {
    width: 270px;
    }
`;

export const ProductName = styled.h2`
  font-family: 'Open Sans', cursive;
  font-size: 45px;
  font-weight: bold;
  color: var(--light-black);
  margin-left: 2rem;
  @media (max-width: 1190px) {
    font-size: 36px;
    }
  @media (max-width: 910px) {
    font-size: 30px;
    }
`;

export const ProductDetail = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: var(--light-black);
  width: 400px;
  line-height: 1.7;
  @media (max-width: 1190px) {
    font-size: 15px;
      width: 300px;
      line-height: 1.4;
    }
    @media (max-width: 910px) {
    font-size: 14px;
    width: 250px;
    }
`;
export const ProductPrice = styled.h2`
  display: flex;
  font-size: 19px;
  color: var(--white);
  background-color: #665d49;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 300px;
  padding: 18px;
  @media (max-width: 1190px) {
    font-size: 17px;
    width: 230px;
    margin-left: 15px;
    }
    @media (max-width: 910px) {
    font-size: 15px;
    width: 150px;
    height: 30px;
    margin-left: 35px;
    }
`;

export const ProductImgContainer = styled.div<ProductImgContainerProps>`
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
      background-image: url(${backgroundImage?? ''});
      background-repeat: no-repeat;
      background-size: cover;
    `}
    @media (max-width: 1320px) {
      width: 300px;
      height: 300px
    }
    @media (max-width: 1190px) {
      width: 230px;
      height: 230px
    }
    @media (max-width: 910px) {
    width: 20%;
    border-radius:30px;
    }
`;
