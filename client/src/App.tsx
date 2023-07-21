import { useState } from 'react';
import { Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { RouteList } from './RouteList';
import Header from './share/Header/Header';
import Footer from './share/Footer';
import useAxiosInterceptor from './hooks/useAxiosInterceptor';
import useRouteAnimation from './hooks/useRouteAnimation';

const MainContent = styled.div`
  flex-grow: 1;
`;

function App() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useRouteAnimation(location, displayLocation, setDisplayLocation, setTransitionStage);
  useAxiosInterceptor();

  const hideFooter = location.pathname === '/' || location.pathname === '/auth';

  return (
    <>
      <Header />
      <div
        className={`${transitionStage}`}
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <MainContent>
          <Routes location={displayLocation}>{RouteList}</Routes>
        </MainContent>
        {!hideFooter && <Footer />}
      </div>
    </>
  );
}

export default App;
