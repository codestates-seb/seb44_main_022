import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://ec2-13-209-180-178.ap-northeast-2.compute.amazonaws.com:8080',
});
axiosInstance.defaults.headers.common['ngrok-skip-browser-warning'] = true;

export default axiosInstance;
