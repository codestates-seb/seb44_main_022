import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/apis';
import { LocalStorage } from '../utils/browserStorage';
import { postRefreshToken } from '../api/authApis';

const useAxiosInterceptor = () => {
  const navigate = useNavigate();
  const requestHandler = (config: any) => {
    const accessToken = LocalStorage.get('AccessToken');
    if (accessToken) {
      config.headers['Authorization'] = accessToken;
    }
    return config;
  };

  const requestErrorHandler = (err: any) => {
    return Promise.reject(err);
  };

  const responseHandler = (res: any) => {
    return res;
  };

  const responseErrorHandler = async (err: any) => {
    const {
      config,
      response: { data },
    } = err;

    if (data.status === 401 && !config._retry) {
      switch (data.message) {
        case 'Access Token Expired': {
          const originRequest = config;
          const response = await postRefreshToken();
          if (response.status === 200) {
            const newAccessToken = response.headers['authorization'];
            LocalStorage.set<string>('AccessToken', newAccessToken);
            originRequest.headers['Authorization'] = newAccessToken;
            return axios(originRequest);
          } else {
            break;
          }
        }
        case 'Refresh Token Expired': {
          alert('토큰이 만료되었습니다. 다시 로그인 해주세요.');
          LocalStorage.clear();
          navigate('/auth');
          break;
        }
        case 'Unauthorized': {
          if (config.url === '/login') {
            break;
          }
          alert('로그인 후 이용이 가능합니다.');
          navigate('/auth');
          break;
        }
        case 'Customer ID and Seller ID are the same': {
          throw err;
        }
        default:
          break;
      }
    } else if (data.status === 403 && data.message === 'Invalid Refresh Token State') {
      LocalStorage.clear();
      navigate('/');
    } else {
      throw err;
    }
  };

  const requestInterceptor = axiosInstance.interceptors.request.use(
    (config) => requestHandler(config),
    (error) => requestErrorHandler(error)
  );

  const responseInterceptor = axiosInstance.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => responseErrorHandler(error)
  );

  useEffect(() => {
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);
};

export default useAxiosInterceptor;
