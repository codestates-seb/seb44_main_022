import { Map } from 'react-kakao-maps-sdk';
import { useState } from 'react';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import { POSITIONS, UNMOUNT_ANIMATION_TIME } from '../../assets/constantValue/constantValue';
import { PositionData } from '../../assets/interface/Map.interface';
import MapModal from './MapModal';
import CustomMarker from './CustomMarker';
import { MapContainer } from './Map.style';

function MapPage() {
  const { lat, lng } = useCurrentLocation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [clickedId, setClickedId] = useState(0);
  const [isClose, setIsClose] = useState(true);

  const unmountAnimation = () => {
    setTimeout(() => setIsOpenModal(!isOpenModal), UNMOUNT_ANIMATION_TIME);
  };

  const handleCloseModal = () => {
    setIsClose(true);
    unmountAnimation();
  };

  const handleClickMarker = (position: PositionData) => {
    if (!isClose) {
      if (clickedId === position.storeId) {
        setIsClose(true);
        handleCloseModal();
        return;
      }
    }
    setIsOpenModal(true);
    setClickedId(position.storeId);
    setIsClose(false);
  };

  return (
    <div
      style={{
        marginTop: '160px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        paddingTop: '2rem',
      }}
    >
      <div
        style={{
          width: '80%',
          padding: '0 2rem 2rem 2rem',
        }}
      >
        BUYTE에 입점된 매장을 찾아보세요!
      </div>
      <MapContainer>
        <Map
          center={{ lat: lat, lng: lng }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '40px',
          }}
          level={3}
        >
          {POSITIONS.map((position, idx) => (
            <CustomMarker key={idx} markerPosition={position} handleClick={handleClickMarker} />
          ))}

          {isOpenModal && clickedId !== 0 && (
            <MapModal
              position={POSITIONS[clickedId - 1]}
              isClose={isClose}
              handleCloseModal={handleCloseModal}
            />
          )}
        </Map>
      </MapContainer>
    </div>
  );
}

export default MapPage;
