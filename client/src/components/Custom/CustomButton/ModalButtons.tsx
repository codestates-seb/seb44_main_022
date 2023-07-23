import { useState, useRef, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import modal_cake from '../../../assets/images/img_modal/modal_cake.png';
import saveAsImage from '../CustomContent/UseSaveAsImage';
import ProductCartAlert from '../../../share/ProductCartAlert';
import CloseButton from './CloseButton';
import CartButton from './CartButton';
import Popup from './Popup';

const ImageBox = styled.div`
  position: absolute;
  background-color: #ffe57d;
  width: 155px;
  height: 75px;
  bottom: 0px;
  right: 115px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px 0px 0px 0px;
`;

const Overlay = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: 20;
  display: ${({ show }) => (show ? 'block' : 'none')};
`;

const blink = keyframes`
  0% {opacity: 1;}
  50% {opacity: 0.3;}
  100% {opacity: 1;}
`;

const Image = styled.img<{ blinking: boolean }>`
  width: 50px;
  height: 50px;
  cursor: pointer;

  ${({ blinking }) =>
    blinking &&
    css`
      animation: ${blink} 1s linear infinite;
    `}
`;

const CenteredAlertContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 58%;
  transform: translate(-50%, -50%);
  z-index: 30;
`;

type ModalButtonsProps = {
  onRequestClose: () => void;
  images: ImageData[];
  canvasRef: React.RefObject<HTMLCanvasElement>;
  storeId: number;
  productId: number;
};

type ImageData = {
  imageUrl: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

const ModalButtons = ({
  onRequestClose,
  images,
  canvasRef,
  storeId,
  productId,
}: ModalButtonsProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [blinking, setBlinking] = useState(true);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const closeAlert = () => {
    setShowAlert(false);
    setShowPopup(false);
  };

  const handleImageClick = () => {
    setBlinking(false);
    setShowPopup((prevState) => !prevState);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (showAlert) {
      return;
    }
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setShowPopup(false);
    }
  };

  const handleRequestClose = () => {
    onRequestClose();
  };

  useEffect(() => {
    setBlinking(true);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onSaveImage = async () => {
    const result = await saveAsImage(images, canvasRef, storeId, productId);
    if (result) {
      setShowAlert(true);
    }
  };

  return (
    <>
      <CloseButton onClick={handleRequestClose} />
      <ImageBox ref={popupRef}>
        <Image src={modal_cake} alt="Cart" onClick={handleImageClick} blinking={blinking} />
        <Overlay show={showAlert}>
          <CenteredAlertContainer>
            {showAlert && <ProductCartAlert closeModal={closeAlert} />}
          </CenteredAlertContainer>
        </Overlay>
      </ImageBox>
      <CartButton onSaveImage={onSaveImage} />
      <Popup show={showPopup} />
    </>
  );
};

export default ModalButtons;
