import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useState } from 'react';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import Marker from '../../assets/images/marker.png';

function MapPage() {
  const { lat, lng } = useCurrentLocation();
  const [hoverMarker, setHoverMarker] = useState(false);

  return (
    <Map
      center={{ lat: lat, lng: lng }}
      style={{
        marginTop: '160px',
        width: '100%',
        height: '100%',
      }}
    >
      <MapMarker
        position={{ lat: lat, lng: lng }}
        image={{
          src: Marker,
          size: {
            width: 35,
            height: 35,
          },
        }}
        clickable={true}
        onClick={() => setHoverMarker(!hoverMarker)}
      ></MapMarker>
      {hoverMarker && (
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            border: '1px solid red',
            width: '15vw',
            height: '40%',
            top: '60%',
            right: '5%',
            transform: 'translate(0%, -50%)',
            backgroundColor: 'white',
            borderRadius: '28px',
            minWidth: '250px',
            maxWidth: '315px',
            padding: '1rem',
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: '5%',
            }}
            onClick={() => setHoverMarker(false)}
          >
            x
          </div>
          여기 가게 이름
        </div>
      )}
    </Map>
  );
}

export default MapPage;
