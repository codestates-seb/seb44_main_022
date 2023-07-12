import { MapMarker, useMap } from 'react-kakao-maps-sdk';
import MarkerImg from '../../assets/images/marker.png';
import { PositionData } from '../../assets/interface/Map.interface';

interface MarkerProps {
  markerPosition: PositionData;
  clickMarker: (position: PositionData) => void;
}

function CustomMarker({ markerPosition, clickMarker }: MarkerProps) {
  const map = useMap();

  return (
    <MapMarker
      position={{ lat: markerPosition.storeLatitude, lng: markerPosition.storeLongitude }}
      image={{
        src: MarkerImg,
        size: {
          width: 35,
          height: 35,
        },
      }}
      clickable={true}
      onClick={(marker) => {
        map.panTo(marker.getPosition());
        clickMarker(markerPosition);
      }}
    ></MapMarker>
  );
}

export default CustomMarker;
