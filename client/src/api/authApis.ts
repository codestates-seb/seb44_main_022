import axiosInstance from './api';

export const postLogin = (loginId: string, password: string) => {
  return axiosInstance.post('/login', {
    loginId,
    password,
  });
};

export const postSignUp = (loginId: string, password: string, memberName: string) => {
  return axiosInstance.post('/signup', {
    loginId,
    password,
    memberName,
  });
};
