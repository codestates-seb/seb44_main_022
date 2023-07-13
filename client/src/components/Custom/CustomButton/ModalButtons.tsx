import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import modal_cake from '../../../assets/images/img_modal/modal_cake.png';
import ExampleImage from '../../../assets/images/img_modal/Example.png';
import Example2 from '../../../assets/images/img_modal/Example2.png';
import CloseButton from './CloseButton';
import CartButton from './CartButton';

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
  border-radius: 20px 0px 0px 0px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const PopupContainer = styled.div<{ show: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
  opacity: ${(props) => (props.show ? 1 : 0)};
  animation-name: ${(props) => (props.show ? fadeIn : fadeOut)};
  animation-fill-mode: forwards; /* Retains the styles of the last keyframe after the animation ends */
  width: 60%;
  height: 50%;

  @media (max-width: 908px) {
    flex-direction: column;
  }
`;

const PopupImage = styled.img`
  width: 500px;
  height: auto;
  max-height: 100%;
  max-width: 100%;

  @media (max-width: 768px) {
    width: auto;
  }
`;

const PopupContent = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 40px;
  flex-grow: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  flex-shrink: 0;
  border: 0.1px solid rgba(0, 0, 0, 0.1);
  border-width: 0.5px 1px 1px 0.5px;
  border-radius: 15px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
`;

const Part1 = styled.div`
  height: 18%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px 15px 0 0;
  margin: 5px;
`;

const Part2 = styled.div`
  height: 64%;
  background: url(${Example2}) no-repeat;
  background-color: rgba(242, 242, 242, 0.2);
  background-blend-mode: overlay;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: white;
  line-height: 2.8;
  font-size: 20px;
`;

export const LogoFont = styled.div`
  font-family: Just Another Hand, cursive;
  font-size: 4rem;
  margin-bottom: 4rem;
  cursor: pointer;
`;

const Part3 = styled.div`
  height: 18%;
  font-family: Just Another Hand, cursive;
  font-size: 28px;
  border-radius: 0 0 15px 15px;
  padding-top: 26px;
  color: #726e6e;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type ModalButtonsProps = {
  onRequestClose: () => void;
};

const ModalButtons: React.FC<ModalButtonsProps> = ({ onRequestClose }) => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const handleImageClick = () => {
    setShowPopup((prevState) => !prevState);
  };

  return (
    <>
      <CloseButton onClick={onRequestClose} />
      <ImageBox ref={popupRef}>
        <Image src={modal_cake} alt="Cart" onClick={handleImageClick} />
      </ImageBox>
      <CartButton onRequestClose={onRequestClose} />
      {showPopup && (
        <PopupContainer show={showPopup}>
          <PopupContent>
            <PopupImage src={ExampleImage} alt="Example" />
            <RightContent>
              <Part1>커스텀 주문제작 방법</Part1>
              <Part2>
                1. 단면 그림으로 그려주면 사장님이 알기 쉬움 <br />
                2. 참고할 만한 이미지를 같이 추가해줘도 됨 <br /> 3. 사이드바(?)에서 원하는 재료들을
                추가해 <br />
                4. 장바구니에 넣으면 됨
              </Part2>
              <Part3>BUYTE BUYTE BUYTE BUYTE BUYTE BUYTE BUYTE</Part3>
            </RightContent>
          </PopupContent>
        </PopupContainer>
      )}
    </>
  );
};

export default ModalButtons;
