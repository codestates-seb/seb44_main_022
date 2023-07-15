import { Route } from 'react-router-dom';
import Payment from './pages/order/Payment/Payment';
import Main from './pages/main/Main';
import Auth from './pages/users/Auth/Auth';
import Mypage from './pages/mypage/Mypage';
import ShoppingCart from './pages/order/ShoppingCart/ShoppingCart';
import StoreList from './pages/store/StoreList';
import Map from './pages/map/MapPage';
import SelectStore from './pages/store/SelectStore';
import OrderComplete from './pages/order/OrderComplete/OrderComplete';
import StoreDetail from './pages/store/StoreDetail';

export const mainRoutes = (
  <>
    <Route path="" element={<Main />} />
    <Route path="mypage/:id" element={<Mypage />} />
    <Route path="cart" element={<ShoppingCart />} />
    <Route path="payment" element={<Payment />} />
    <Route path="/store/:storeId" element={<StoreDetail />}/>
    <Route path="store" element={<StoreList />} />
    <Route path="map" element={<Map />} />
    <Route path="select" element={<SelectStore />} />
    <Route path="complete" element={<OrderComplete />} />
    <Route path="auth" element={<Auth />} />
  </>
);
