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

export const getCustomBoard = async (store_id: number, product_id: number) => {
  try {
    const response = await axiosInstance({
      method: 'get',
      url: `/store/${store_id}/custom/${product_id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { creamIngredientList, toppingIngredientList, fillingIngredientList } = response.data;

    return {
      creamIngredientList,
      toppingIngredientList,
      fillingIngredientList,
    };
  } catch (error) {
    // console.error(error);
  }
};
