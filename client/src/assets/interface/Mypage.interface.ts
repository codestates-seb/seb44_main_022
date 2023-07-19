import { ButtonHTMLAttributes } from 'react';
export interface Product {
  orderProductId: number;
  productId: number;
  productName: string;
  productImage: string;
  productPrice: number;
  productCount: number;
  storeId: number;
}

export interface OrderData {
    orderId: number; 
    orderAddress: string;
    orderProductInfos: Product[];
    totalPrice: number;
    createdAt: string;
    orderStatus: string;
  }
  
  export interface PageInfo {
    page: number;
    size: number;
    totalElement: number;
    totalPage: number;
  }
  
  export interface Data {
    orderInfos: OrderData[];
    pageInfo: PageInfo;
  }

export interface OrderData {
    orderId: number; 
    orderAddress: string;
    orderProductInfos: Product[];
    totalPrice: number;
    createdAt: string;
    orderStatus: string;
  }
  
export interface MypageOrderListProps {
    products: OrderData;
  }

  
export interface MypageOrderDetailProps {
  product: Product;
}


export interface PaginationProps {
  data: Data; 
  currentPage: number;
  onPageChange: (page: number) => void;
}

export interface PageButtonsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

 export interface EditableNicknameProps {
  nickname: string;
  onNicknameChange: (newNickname: string) => void;
  onEditModeToggle: () => void;
}  
