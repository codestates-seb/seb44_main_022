import { Map } from 'react-kakao-maps-sdk';
import { useState } from 'react';
import styled from 'styled-components';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import { POSITIONS } from '../../assets/constantValue/constantValue';
import { PositionData } from '../../assets/interface/Map.interface';
import MapModal from './MapModal';
import CustomMarker from './Marker';

function MapPage() {
  const { lat, lng } = useCurrentLocation();
  const [toggle, setToggle] = useState(false);
  const [id, setId] = useState(0);
  const [isClose, setIsClose] = useState(true);

  const closeModal = () => {
    setTimeout(() => setToggle(!toggle), 290);
  };

  const clickMarker = (position: PositionData) => {
    if (!isClose) {
      if (id === position.storeId) {
        setIsClose(true);
        closeModal();
        return;
      }
    }
    setToggle(true);
    setId(position.storeId);
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
            <CustomMarker key={idx} markerPosition={position} clickMarker={clickMarker} />
          ))}

          {toggle && id !== 0 && (
            <MapModal
              position={POSITIONS[id - 1]}
              isClose={isClose}
              setIsClose={setIsClose}
              CheckState={closeModal}
            />
          )}
        </Map>
      </MapContainer>
    </div>
  );
}

const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 80%;
  min-height: 500px;
  margin-bottom: 2rem;
`;

export default MapPage;
