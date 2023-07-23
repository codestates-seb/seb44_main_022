export interface Product {
    productId: number;
    storeId:number;
    productName: string;
    productImage: string;
    productPrice: number;
  }
  
  export interface PageInfo {
    currentPage: number;
    totalPage: number;
  }
  
  export interface ProductCardProps {
    data: Product[];
  }
  
  export interface ProductContainer {
    productId: number;
    productImage: string;
    productName: string;
    productType: string;
    productIntroduction: string;
    productPrice: number;
  }
  
  export interface ProductDetailInfo {
    storeId: number;
    storeName: string;
    storeAddress: string;
    storeIntroduction: string;
    storeLatitude: number;
    storeLongitude: number;
    storePhoneNumber: string;
    storeImage: string;
    customProductInfoList: Product[];
    standardProductInfoList: Product[];
  }