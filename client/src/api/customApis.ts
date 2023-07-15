import axiosInstance from './apis';

export const addCustom = (store_id: number, product_id: number, file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  return axiosInstance({
    method: 'post',
    url: `/store/${store_id}/custom/${product_id}`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
