import { useEffect, useState } from 'react';
import { Routes, useLocation } from 'react-router-dom';
import { authRoute, mainRoutes } from './Routes';

function App() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fadeOut');
    }
  }, [location]);

  return (
    <>
      <div
        className={`${transitionStage}`}
        style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
        onAnimationEnd={() => {
          if (transitionStage === 'fadeOut') {
            setTransitionStage('fadeIn');
            setDisplayLocation(location);
          }
        }}
      >
        <Routes location={displayLocation}>
          {mainRoutes}
          {authRoute}
        </Routes>
      </div>
    </>
  );
}

export default App;
