import axiosInstance from './api';

export const deleteCartList = (cartIds: number[]) => {
  return axiosInstance.post('/cart/1/delete', {
    data: {
      cartIds,
    },
  });
};

export const getCartList = () => {
  return axiosInstance.get('/cart/1');
};

export const postSelectedCartList = (cartIds: number[]) => {
  return axiosInstance.post('/cart/1/payment', {
    cartIds,
  });
};

export const patchProductCount = (cartId: number, count: number) => {
  return axiosInstance.patch('/cart/1', {
    cartId,
    count,
  });
};

export const postAfterPayment = (cartIds: number[], impUid: string) => {
  return axiosInstance.post('/order/payment', {
    cartIds,
    impUid,
  });
};
