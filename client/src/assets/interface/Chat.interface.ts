export interface IdType {
  senderId: number;
  receiverId: number;
}

export interface BaseChatData extends IdType {
  roomId: number;
}

export interface MessageList {
  senderId: number;
  receiverId: number;
  content: string;
  message?: string;
  createdAt: string;
}

export interface ChatBoxProps {
  setIsOpenChatting: React.Dispatch<React.SetStateAction<boolean>>;
  storeId?: string | undefined;
  storeName: string | undefined;
  roomIdProps?: number;
  receiverIdProps?: number;
  senderIdProps?: number;
}

export interface ChatButtonProp {
  storeId: string | undefined;
  storeName: string | undefined;
}

export interface ChatListType {
  senderId: number;
  receiverId: number;
  roomId: number;
  customerName: string;
  storeName: string;
}

export interface ChatIntroProps {
  text: string;
}
