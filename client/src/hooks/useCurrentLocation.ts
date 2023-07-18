import { useEffect, useState } from 'react';
import { useCurrentLocationProps } from '../assets/interface/Map.interface';

const useCurrentLocation = (storePosition: useCurrentLocationProps | null) => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    if (storePosition !== null) {
      return setCurrentLocation({
        lat: storePosition.lat,
        lng: storePosition.lng,
      });
    }

    const success = (position: GeolocationPosition) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const fail = () => {
      setCurrentLocation({
        lat: 33.5563,
        lng: 126.79581,
      });
    };
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(success, fail, {
        timeout: 10000,
        enableHighAccuracy: true,
      });
  }, [navigator.geolocation.getCurrentPosition]);

  return currentLocation;
};

export default useCurrentLocation;
