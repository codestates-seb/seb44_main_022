import axiosInstance from './apis';

export const getChatHistory = async (roomId: number) => {
  return await axiosInstance.get(`/room/${roomId}`);
};

export const getChatRoomId = (storeId: string | undefined) => {
  return axiosInstance.get(`/room?storeId=${storeId}`);
};

export const getSellerChatList = () => {
  return axiosInstance.get('/room/seller');
};
