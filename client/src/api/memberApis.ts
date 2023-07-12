import axiosInstance from './api';

export const getMembers = () => {
  return axiosInstance.get('/members');
};
