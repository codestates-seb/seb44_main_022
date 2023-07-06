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
  background-color: rgba(255, 255, 255);
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
  z-index: 10;
`;
const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;
const RangeInputContainer = styled.div`
  background-color: transparent;
  position: absolute;
  width: 100%;
  bottom: 35%;
  left: 0;
  display: flex;
  justify-content: center;
  z-index: 15;
`;

const RangeInput = styled.input.attrs({
  type: 'range',
  min: '1',
  max: '100',
  defaultValue: '50',
})`
  position: relative;
  z-index: 20;
  -webkit-appearance: none;
  background-color: blue;
  border-radius: 10px;
  height: 10px;
  width: 90%;
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

  &:focus {
    animation: 1s pulse infinite;
    outline: none;
  }

  &:hover {
    background-color: hotpink;
  }

  background-color: pink;
  top: calc(5px + 50%);

  transition: background-color 0.2s ease-in-out, top 0.2s ease-in-out;
`;

const ColorInput = styled.input.attrs({
  type: 'color',
})`
  position: relative;
  z-index: 20;
  height: 25px;
  margin-left: 20px;

  &::-webkit-color-swatch {
    position: absolute;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 3px;
    padding: 0;
    pointer-events: none;
  }

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &:focus {
    animation: 1s pulse infinite;
    outline: none;
  }
`;

const ModalComponent: React.FC<ModalProps> = ({ isOpen, onRequestClose, contentLabel }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState(5);
  const [color, setColor] = useState('#000000');

  const handleChangeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(Number(event.target.value));
  };

  const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineWidth = size;
        ctx.strokeStyle = 'black';
        ctx.lineCap = 'round';
        ctx.strokeStyle = color;
        ctx.lineJoin = 'round';
      }
    }
  }, [size, color]);

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (event.buttons !== 1) return;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }
  };
  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(x, y);
      }
    }
  };
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
              <ColorInput id="line-color" value={color} onChange={handleChangeColor} />
            </RangeInputContainer>
            {/* Canvas 추가 */}
            <CanvasWrapper>
              <Canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
              />
            </CanvasWrapper>
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
