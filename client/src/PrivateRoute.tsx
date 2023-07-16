import { Navigate, Outlet } from 'react-router-dom';
import { LocalStorage } from './utils/browserStorage';
import { LOCAL_STORAGE_KEY_LIST } from './assets/constantValue/constantValue';

interface PrivateRouteProps {
  children?: React.ReactElement;
  isAuth: boolean;
}

function PrivateRoute({ isAuth }: PrivateRouteProps) {
  const accessToken = LocalStorage.get(LOCAL_STORAGE_KEY_LIST.AccessToken);

  if (isAuth) {
    return accessToken !== null ? <Outlet /> : <Navigate to="/" />;
  } else {
    return accessToken !== null ? <Navigate to="/" /> : <Outlet />;
  }
}

export default PrivateRoute;
