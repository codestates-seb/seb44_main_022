import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BsCircleFill } from 'react-icons/bs';
import { MapModalProps } from '../../assets/interface/Map.interface';
import {
  IMAGE_NUMBER_BUTTON,
  STORE_MAP_INTRODUCE_LIMIT,
} from '../../assets/constantValue/constantValue';
import {
  ExitMapModalButton,
  ImageCarouselButton,
  ImageCarouselButtonContainer,
  MapModalAddressContainer,
  MapModalImg,
  MapModalImgBox,
  MapModalImgContainer,
  MapModalStoreImg,
  MapModalStoreInfoContainer,
  MapModalStoreName,
  MapModalTitleContainer,
} from './MapModal.style';
import { MarkerModal } from './Map.style';

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

  useEffect(() => {
    setCurrentNumber(0);
  }, [position]);

  return (
    <>
      <MarkerModal isClose={isClose}>
        <ExitMapModalButton onClick={handleCloseModal}>
          <BsCircleFill style={{ color: 'var(--purple)' }} />
        </ExitMapModalButton>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <MapModalTitleContainer>
            <div style={{ overflow: 'hidden', borderRadius: '50%' }}>
              <MapModalStoreImg src={position.storeImage} onClick={clickStore} />
            </div>

            <MapModalStoreInfoContainer>
              <MapModalStoreName onClick={clickStore}>{position.storeName}</MapModalStoreName>
              <MapModalAddressContainer>
                <FaSearch style={{ paddingTop: '3px', paddingLeft: '2px', paddingRight: '5px' }} />
                {position.storeAddress}
              </MapModalAddressContainer>
            </MapModalStoreInfoContainer>
          </MapModalTitleContainer>
          <MapModalImgContainer>
            <MapModalImgBox>
              <MapModalImg currentNumber={currentNumber}>
                {position.productPreferenceList.map((product) => (
                  <img
                    src={product.productImage}
                    style={{
                      width: '100%',
                      height: '112%',
                      padding: '1rem',
                      objectFit: 'fill',
                    }}
                    key={product.productId}
                    alt="추천 제품 사진"
                  />
                ))}
              </MapModalImg>
              <ImageCarouselButtonContainer>
                {IMAGE_NUMBER_BUTTON.map((number) => (
                  <ImageCarouselButton
                    imageNumber={number}
                    currentNumber={currentNumber}
                    onClick={() => setCurrentNumber(number)}
                    key={number}
                  ></ImageCarouselButton>
                ))}
              </ImageCarouselButtonContainer>
            </MapModalImgBox>
          </MapModalImgContainer>

          <div
            style={{
              padding: '1.5rem 2rem',
              lineHeight: '1.25',
              whiteSpace: 'pre-line',
              wordBreak: 'break-word',
            }}
          >
            {sliceText(position.storeIntroduction)}
          </div>
        </div>
      </MarkerModal>
    </>
  );
}

export default MapModal;
