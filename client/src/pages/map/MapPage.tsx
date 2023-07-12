import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useState } from 'react';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import Marker from '../../assets/images/marker.png';
import { POSITIONS } from '../../assets/constantValue/constantValue';
import MapModal from './MapModal';

function MapPage() {
  const { lat, lng } = useCurrentLocation();
  const [toggle, setToggle] = useState(false);
  const [id, setId] = useState(0);
  const [isClose, setIsClose] = useState(true);

  const closeModal = () => {
    setTimeout(() => setToggle(!toggle), 290);
  };

  return (
    <Map
      center={{ lat: lat, lng: lng }}
      style={{
        marginTop: '160px',
        width: '100%',
        height: '100%',
      }}
      level={3}
    >
      {POSITIONS.map((position, idx) => (
        <MapMarker
          key={idx}
          position={position.latlng}
          image={{
            src: Marker,
            size: {
              width: 35,
              height: 35,
            },
          }}
          clickable={true}
          onClick={() => {
            console.log(id, position.id, isClose, toggle);
            if (!isClose) {
              if (id === position.id) {
                setIsClose(true);
                closeModal();
                return;
              }
            }
            setToggle(true);
            setId(position.id);
            setIsClose(false);
          }}
        ></MapMarker>
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
  );
}

export default MapPage;
