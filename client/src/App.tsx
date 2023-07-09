import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Payment from './pages/order/Payment';
import Main from './pages/main/Main';
import Auth from './pages/users/Auth/Auth';
import Mypage from './pages/mypage/Mypage';
import ShoppingCart from './pages/order/ShoppingCart/ShoppingCart';
import Store from './pages/store/Store';
import Map from './pages/map/Map';
import SelectStore from './pages/store/SelectStore';
import './index.css';
import Header from './share/Header';
import Footer from './share/Footer';
import Complete from './pages/order/Complete';

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
        {/* {location.pathname !== '/auth' && <Header />} */}
        <Routes location={displayLocation}>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Main />} />
            <Route path="mypage/:id" element={<Mypage />} />
            <Route path="cart" element={<ShoppingCart />} />
            <Route path="payment" element={<Payment />} />
            <Route path="store" element={<Store />} />
            <Route path="map" element={<Map />} />
            <Route path="select" element={<SelectStore />} />
            <Route path="complete" element={<Complete />} />
          </Route>
          <Route path="auth" element={<Auth />} />
        </Routes>
        {/* {location.pathname !== '/auth' && <Footer />} */}
      </div>
    </>
  );
}

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
