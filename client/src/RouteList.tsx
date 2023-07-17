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

export const normalRoutes = [
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/select',
    element: <SelectStore />,
  },
  {
    path: '/map',
    element: <Map />,
  },
  {
    path: '/store',
    element: <StoreList />,
  },
  {
    path: '/store/:storeId',
    element: <StoreDetail />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export const privateDisabledRoutes = [
  {
    path: '/auth',
    element: <Auth />,
  },
];

export const privateEnabledRoutes = [
  {
    path: '/payment',
    element: <Payment />,
  },
  {
    path: '/complete',
    element: <OrderComplete />,
  },
  {
    path: '/mypage',
    element: <Mypage />,
  },
  {
    path: '/cart',
    element: <ShoppingCart />,
  },
];

export const RouteList = (
  <>
    {normalRoutes.map((route, index) => (
      <Route key={index} path={route.path} element={route.element} />
    ))}
    <Route element={<PrivateRoute isAuth={false} />}>
      {privateDisabledRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Route>
    <Route element={<PrivateRoute isAuth={true} />}>
      {privateEnabledRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Route>
  </>
);
