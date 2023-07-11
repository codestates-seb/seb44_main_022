import axiosInstance from './api';

export const postLogin = (loginId: string, password: string) => {
  return axiosInstance.post(
    '/login',
    {
      loginId,
      password,
    },
    {
      withCredentials: true,
    }
  );
};

export const postSignUp = (loginId: string, password: string, memberName: string) => {
  return axiosInstance.post('/signup', {
    loginId,
    password,
    memberName,
  });
};

export const postAccessToken = () => {
  return axiosInstance.post('/token/refresh', null, {
    withCredentials: true,
  });
};
