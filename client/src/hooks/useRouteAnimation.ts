import { useEffect } from 'react';
import { Location } from 'react-router-dom';
import { BASE_ANIMATION_TIME } from '../assets/constantValue/constantValue';

const useRouteAnimation = (
  location: Location,
  displayLocation: Location,
  setDisplayLocation: React.Dispatch<React.SetStateAction<Location>>,
  setTransitionStage: React.Dispatch<React.SetStateAction<string>>
) => {
  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('fadeOut');

      setTimeout(() => {
        setTransitionStage('fadeIn');
        setDisplayLocation(location);
      }, BASE_ANIMATION_TIME);
    }
  }, [location]);
};

export default useRouteAnimation;
