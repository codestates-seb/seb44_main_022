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

export const postRefreshToken = async () => {
  const response = await axiosInstance.post('/token/refresh', null, {
    withCredentials: true,
  });

  return response;
};
