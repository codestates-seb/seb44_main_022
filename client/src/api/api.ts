import axios from 'axios';
import { postRefreshToken } from './authApis';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
axiosInstance.defaults.headers.common['ngrok-skip-browser-warning'] = true;

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('AccessToken');
    if (accessToken) {
      config.headers['Authorization'] = accessToken;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const {
      config,
      response: { data },
    } = err;

    if (data.status === 401) {
      if (data.message === 'Access Token Expired') {
        console.log('토큰 만료');
        const originRequest = config;
        const response = await postRefreshToken();
        if (response.status === 200) {
          const newAccessToken = response.headers['authorization'];
          localStorage.setItem('AccessToken', newAccessToken);
          originRequest.headers['Authorization'] = newAccessToken;
          return axios(originRequest);
        }
      } else if (data.message === 'Refresh Token Expired') {
        alert('토큰이 만료되었습니다. 다시 로그인 해주세요.');
        localStorage.setItem('AccessToken', '');
        window.location.href = '/auth';
      }
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
