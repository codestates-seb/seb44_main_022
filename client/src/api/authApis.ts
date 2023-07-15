import axiosInstance from './apis';

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
  return await axiosInstance.post('/token/refresh', null);
};

export const postGoogleOAuth = (code: string) => {
  return axiosInstance.post(`/signup/oauth?authorization=${code}`);
};

export const postGoogleOAuthLogin = (code: string) => {
  return axiosInstance.post(`/login/oauth?authorization=${code}`);
};

export const postLogout = () => {
  return axiosInstance.post('/logout', null);
};
