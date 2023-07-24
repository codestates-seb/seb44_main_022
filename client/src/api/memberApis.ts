import axiosInstance from './apis';

export const getMembers = () => {
  return axiosInstance.get('/members');
};
