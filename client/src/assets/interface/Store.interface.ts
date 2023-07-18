export interface Store {
  storeId: number;
  storeName: string;
  storeAddress: string;
  storeImage: string;
}

export interface PageInfo {
  currentPage: number;
  totalPage: number;
}

export interface StoreCardProps {
  data: Store[];
}

export interface ProductContainer {
  productId: number;
  productImage: string;
  productName: string;
  productType: string;
  productIntroduction: string;
  productPrice: number;
}

export interface StoreDetailInfo {
  storeId: number;
  storeName: string;
  storeAddress: string;
  storeIntroduction: string;
  storePhoneNumber: string;
  storeImage: string;
  customProductInfoList: Product[];
  standardProductInfoList: Product[];
}

export interface ProductCardProps {
  data: Product[];
  storeId: number;
  storeName: string;
}

export interface Product {
  productId: number;
  productImage: string;
  productName: string;
  productType: string;
  productIntroduction: string;
  productPrice: number;
}

export interface ModalComponentDetailProps {
  product: Product;
  closeModal: () => void;
  storeId: string;
  storeName: string;
  productId: string;
}

export interface ModalProps extends ModalComponentDetailProps {
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
  overlay?: boolean;
}

export interface ProductImgContainerProps {
  backgroundImage?: string;
}
