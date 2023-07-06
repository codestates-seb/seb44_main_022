import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import modal_cart from '../assets/images/img_modal/modal_cart.png';
import modal_cake from '../assets/images/img_modal/modal_cake.png';
import CustomSidebar from '../components/custom/CustomSidebar';

type ModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
  children: React.ReactNode;
  overlay?: boolean;
};

const Title = styled.h3`
  font-family: 'Just Another Hand', cursive;
  margin-bottom: 20px;
  font-size: 40px;
  align-self: flex-end;
  position: absolute;
  right: 40%;
  top: 20px;
  color: var(--light-black);
  z-index: 4;
`;

const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 77%;
  min-width: 77%;
  box-shadow: 0px 8px 24px rgba(49, 70, 86, 0.12);
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 10;
  border-radius: 20px;
  overflow: hidden;
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
  border-radius: 0px 20px 0px 0px;
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
  border-radius: 0px 0px 20px 0px;
  background-color: rgba(20, 46, 56, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  border-radius: 20px 0px 0px 0px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
`;

const CustomContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2), 0px 25px 20px rgba(0, 0, 0, 0.35);
  border: 0.5px solid rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
`;

const ContentContainer = styled.div`
  margin-left: 20%;
  width: 80%;
  min-height: 100vh;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(50px);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const CanvasWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;
const RangeInputContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 35%;
  left: 0;
  display: flex;
  justify-content: center;
  z-index: 11; // 수정된 부분
`;

const RangeInput = styled.input.attrs({
  type: 'range',
  min: '1',
  max: '10',
  defaultValue: '5',
})`
  -webkit-appearance: none;
  background-color: blue; // 수정된 부분
  border-radius: 10px;
  height: 10px;
  width: 90%;
  outline: none;
  opacity: 1;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background-color: red;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: yellow;
    cursor: pointer;
  }
`;
const ModalComponent: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  contentLabel,
  children,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState(5);

  const handleChangeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(Number(event.target.value));
  };

  React.useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [size]);

  return (
    <ModalContainer>
      {isOpen && <Overlay />}
      <StyledModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel={contentLabel}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        overlayClassName="overlay"
      >
        <CustomContainer>
          <Draggable>
            <Title>BUYTE</Title>
          </Draggable>
          <CustomSidebar />
          <ContentContainer>
            <RangeInputContainer>
              <RangeInput id="line-width" value={size} onChange={handleChangeSize} />
            </RangeInputContainer>
            <CanvasWrapper>
              {/*
                  이 부분에서 스타일을 수정하여 Canvas 크기를 조정합니다.
                  이전까지는 height/width: 100%였지만, 이제는 state 값을 사용합니다.
                  RangeInput에서 state를 조정하는 대로 Canvas 크기도 같이 커지거나 작아지게 됩니다.
                */}
              <Canvas ref={canvasRef} width={100 * size} height={80 * size} />
            </CanvasWrapper>
            {children}
          </ContentContainer>
        </CustomContainer>
        <ModalButtons>
          <CloseButton onClick={onRequestClose}>X</CloseButton>
          <ImageBox>
            <Image src={modal_cake} alt="Cart" />
          </ImageBox>
          <CartButton>
            <CartImage src={modal_cart} alt="Cart" />
            <CartButtonText>장바구니 담기</CartButtonText>
          </CartButton>
        </ModalButtons>
      </StyledModal>
    </ModalContainer>
  );
};

export default ModalComponent;
