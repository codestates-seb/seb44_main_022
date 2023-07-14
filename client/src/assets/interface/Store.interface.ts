
export interface Store {
    storeId: number;
    storeName: string;
    storeAddress: string;
    storeImage: string;
  }
  
export  interface PageInfo {
    currentPage: number;
    totalPage: number;
  }
  
export   interface StoreCardProps {
    data: Store[];
  }