import { Route, Routes, useLocation } from 'react-router-dom';
import Main from './pages/main/Main';
import Auth from './pages/users/Auth';
import Mypage from './pages/mypage/Mypage';
import ShoppingCart from './pages/order/ShoppingCart';
import Store from './pages/store/Store';
import Map from './pages/map/Map';
import SelectStore from './pages/store/SelectStore';
import Header from './share/Header';
import Footer from './share/Footer';

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/auth' && <Header />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mypage/:id" element={<Mypage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/store" element={<Store />} />
        <Route path="/map" element={<Map />} />
        <Route path="/select" element={<SelectStore />} />
      </Routes>
      {location.pathname !== '/auth' && <Footer />}
    </>
  );
}

export default App;
