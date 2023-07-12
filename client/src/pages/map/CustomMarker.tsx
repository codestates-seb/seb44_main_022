import { MapMarker, useMap } from 'react-kakao-maps-sdk';
import MarkerImg from '../../assets/images/marker.png';
import { PositionData } from '../../assets/interface/Map.interface';

interface MarkerProps {
  markerPosition: PositionData;
  handleClick: (position: PositionData) => void;
}

function CustomMarker({ markerPosition, handleClick }: MarkerProps) {
  const map = useMap();
  const changePositionCenter = (marker: kakao.maps.Marker) => {
    map.panTo(marker.getPosition());
    handleClick(markerPosition);
  };

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
        changePositionCenter(marker);
      }}
    ></MapMarker>
  );
}

export default CustomMarker;
