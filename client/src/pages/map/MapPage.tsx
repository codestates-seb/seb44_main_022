import { Map } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import { UNMOUNT_ANIMATION_TIME } from '../../assets/constantValue/constantValue';
import { PositionData } from '../../assets/interface/Map.interface';
import axiosInstance from '../../api/apis';
import useScreenResize from '../../hooks/useScreenResize';
import MapModal from './MapModal';
import CustomMarker from './CustomMarker';
import { MapContainer, MapPageContainer, MapPageIntroduce } from './Map.style';

function MapPage() {
  const location = useLocation();
  const { lat, lng } = useCurrentLocation(location.state);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [limitSize, setLimitSize] = useState(false);
  const [clickedId, setClickedId] = useState(0);
  const [isClose, setIsClose] = useState(true);
  const [storeMapList, setStoreMapList] = useState([]);

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

  const handleResize = () => {
    setLimitSize(window.innerWidth > 1000);
  };

  useScreenResize(handleResize);

  useEffect(() => {
    axiosInstance.get('/store/map').then((res) => {
      setStoreMapList(res.data);
    });
  }, []);

  useEffect(() => {
    if (storeMapList !== undefined && storeMapList.length > 0 && location.state !== null) {
      setClickedId(location.state.id);
      setIsOpenModal(true);
      setIsClose(false);
    }
  }, [storeMapList]);

  return (
    <MapPageContainer>
      <MapPageIntroduce>BUYTE에 입점된 매장을 찾아보세요!</MapPageIntroduce>
      <MapContainer>
        <Map
          center={{ lat: lat, lng: lng }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '40px',
          }}
          level={10}
        >
          {storeMapList !== undefined &&
            storeMapList.length > 0 &&
            storeMapList.map((position, idx) => (
              <CustomMarker key={idx} markerPosition={position} handleClick={handleClickMarker} />
            ))}

          {isOpenModal && limitSize && clickedId !== 0 && (
            <MapModal
              position={storeMapList[clickedId - 1]}
              isClose={isClose}
              isOpenModal={limitSize}
              handleCloseModal={handleCloseModal}
            />
          )}
        </Map>
      </MapContainer>
    </MapPageContainer>
  );
}

export default MapPage;
