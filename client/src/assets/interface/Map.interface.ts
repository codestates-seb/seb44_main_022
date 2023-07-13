export interface productPreferenceListItem {
  productId: number;
  productImage: string;
}

export interface PositionData {
  storeId: number;
  storeLatitude: number;
  storeLongitude: number;
  storeAddress: string;
  storeImage: string;
  storeName: string;
  storeIntroduction: string;
  productPreferenceList: productPreferenceListItem[];
}

export interface MapModalProps {
  position: PositionData;
  isClose: boolean;
  handleCloseModal: () => void;
}