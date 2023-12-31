import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.defaults.headers.common['ngrok-skip-browser-warning'] = true;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
