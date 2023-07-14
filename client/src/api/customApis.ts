import axiosInstance from './apis';

export const addCustom = (store_id: number, product_id: number) => {
  return axiosInstance.post('/store/store_id/custom/product_id', {
    store_id,
    product_id,
  });
};
