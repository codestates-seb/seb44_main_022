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
import PrivateRoute from './PrivateRoute';
import NotFound from './pages/notfound/NotFound';
import ChatList from './pages/Chat/ChatList';

export const Routes = [
  { path: '/', element: <Main /> },
  { path: '/select', element: <SelectStore /> },
  { path: '/map', element: <Map /> },
  { path: '/store', element: <StoreList /> },
  { path: '/store/:storeId', element: <StoreDetail /> },
  { path: '*', element: <NotFound /> },
  { path: '/auth', element: <Auth />, isAuth: false },
  { path: '/payment', element: <Payment />, isAuth: true },
  { path: '/complete', element: <OrderComplete />, isAuth: true },
  { path: '/mypage', element: <Mypage />, isAuth: true },
  { path: '/cart', element: <ShoppingCart />, isAuth: true },
  { path: '/chatList', element: <ChatList />, isAuth: true, seller: true },
];

export const RouteList = (
  <>
    {Routes.map((route, index) => {
      return route.isAuth === undefined ? (
        <Route key={index} path={route.path} element={route.element} />
      ) : (
        <Route element={<PrivateRoute isAuth={route.isAuth} seller={route.seller} />}>
          <Route key={index} path={route.path} element={route.element} />
        </Route>
      );
    })}
  </>
);
