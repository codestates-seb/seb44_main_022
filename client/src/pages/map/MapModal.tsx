import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { BsCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { MapModalProps } from '../../assets/interface/Map.interface';
import {
  IMAGE_NUMBER_BUTTON,
  STORE_MAP_INTRODUCE_LIMIT,
} from '../../assets/constantValue/constantValue';
import {
  ExitMapModalButton,
  ImageCarouselButton,
  MapModalAddressContainer,
  MapModalStoreImg,
  MapModalStoreInfoContainer,
  MapModalStoreName,
  MapModalTitleContainer,
  MarkerModal,
} from './Map.style';

function MapModal({ position, isClose, handleCloseModal }: MapModalProps) {
  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const navigate = useNavigate();
  const clickStore = () => {
    navigate(`/store/${position.storeId}`);
  };

  const sliceText = (text: string) => {
    if (text.length > STORE_MAP_INTRODUCE_LIMIT)
      return text.slice(0, STORE_MAP_INTRODUCE_LIMIT) + '...';
    return text;
  };

  return (
    <>
      <MarkerModal isClose={isClose}>
        <ExitMapModalButton onClick={handleCloseModal}>BUYTE</ExitMapModalButton>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <MapModalTitleContainer>
            <div style={{ overflow: 'hidden', borderRadius: '50%' }}>
              <MapModalStoreImg src={position.storeImage} onClick={clickStore} />
            </div>

            <MapModalStoreInfoContainer>
              <MapModalStoreName onClick={clickStore}>{position.storeName}</MapModalStoreName>
              <MapModalAddressContainer>
                <FaSearch style={{ paddingLeft: '2px', paddingRight: '5px' }} />
                {position.storeAddress}
              </MapModalAddressContainer>
            </MapModalStoreInfoContainer>
          </MapModalTitleContainer>
          <div style={{ overflow: 'hidden', width: '328px' }}>
            <div
              style={{
                display: 'flex',
                transform: `translateX(-${currentNumber * 327.8}px)`,
                transition: '0.3s',
              }}
            >
              {position.productPreferenceList.map((product) => (
                <img
                  src={product.productImage}
                  style={{
                    width: '328px',
                    height: '296px',
                    padding: '1rem 2rem',
                    objectFit: 'fill',
                  }}
                  alt="추천 제품 사진"
                  key={product.productId}
                />
              ))}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              columnGap: '1rem',
            }}
          >
            {IMAGE_NUMBER_BUTTON.map((number) => (
              <ImageCarouselButton
                imageNumber={number}
                currentNumber={currentNumber}
                onClick={() => setCurrentNumber(number)}
                key={number}
              ></ImageCarouselButton>
            ))}
          </div>

          <div style={{ padding: '1.5rem', fontSize: '14px', lineHeight: '1.25' }}>
            {sliceText(position.storeIntroduction)}
          </div>
        </div>
      </MarkerModal>
    </>
  );
}

export default MapModal;
