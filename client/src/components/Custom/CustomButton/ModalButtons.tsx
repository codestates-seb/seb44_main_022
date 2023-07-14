import { useState, useRef } from 'react';
import styled from 'styled-components';
import modal_cake from '../../../assets/images/img_modal/modal_cake.png';
import saveAsImage from '../CustomContent/UseSaveAsImage';
import CloseButton from './CloseButton';
import CartButton from './CartButton';
import Popup from './Popup';

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
  const popupRef = useRef(null);

  const handleImageClick = () => {
    setShowPopup((prevState) => !prevState);
  };

  const onSaveImage = async () => {
    await saveAsImage(images, canvasRef, storeId, productId);
  };
  return (
    <>
      <CloseButton onClick={onRequestClose} />
      <ImageBox ref={popupRef}>
        <Image src={modal_cake} alt="Cart" onClick={handleImageClick} />
      </ImageBox>
      <CartButton onSaveImage={onSaveImage} />
      {showPopup && <Popup />}
    </>
  );
};

export default ModalButtons;
