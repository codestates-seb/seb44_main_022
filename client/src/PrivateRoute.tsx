import { Navigate, Outlet } from 'react-router-dom';
import { LocalStorage } from './utils/browserStorage';
import { LOCAL_STORAGE_KEY_LIST } from './assets/constantValue/constantValue';
import { PrivateRouteProps } from './assets/interface/Router.interface';

function PrivateRoute({ isAuth }: PrivateRouteProps) {
  const accessToken = LocalStorage.get(LOCAL_STORAGE_KEY_LIST.AccessToken);

  return isAuth === (accessToken !== null) ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
