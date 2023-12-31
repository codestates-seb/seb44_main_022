import axiosInstance from './apis';

export const deleteCartList = (cartIds: number[]) => {
  return axiosInstance.delete('/cart', {
    data: {
      cartIds,
    },
  });
};

export const getCartList = () => {
  return axiosInstance.get('/cart');
};

export const postSelectedCartList = (cartIds: number[]) => {
  return axiosInstance.post('/cart/payment', {
    cartIds,
  });
};

export const patchProductCount = (cartId: number, count: number) => {
  return axiosInstance.patch('/cart', {
    cartId,
    count,
  });
};

export const postAfterPayment = (
  cartIds: number[],
  impUid: string,
  username: string,
  address: string
) => {
  return axiosInstance.post('/order/payment', {
    impUid,
    cartIds,
    username,
    address,
  });
};
