import { useEffect, useState } from 'react';
import { Routes, useLocation } from 'react-router-dom';
import { RouteList } from './RouteList';
import Header from './share/Header/Header';
import Footer from './share/Footer';
import useAxiosInterceptor from './hooks/useAxiosInterceptor';

function App() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    console.log(location, displayLocation, transitionStage);
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('fadeOut');

      setTimeout(() => {
        setTransitionStage('fadeIn');
        setDisplayLocation(location);
      }, 300);
    }
  }, [location]);

  useAxiosInterceptor();

  return (
    <>
      <Header />
      <div
        className={`${transitionStage}`}
        style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
      >
        <Routes location={displayLocation}>{RouteList}</Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
