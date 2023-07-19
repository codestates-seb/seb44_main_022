
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