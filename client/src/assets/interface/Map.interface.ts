export interface Latlng {
  lat: number;
  lng: number;
}

export interface PositionData {
  id: number;
  title: string;
  latlng: Latlng;
}

export interface MapModalProps {
  position: PositionData;
  isClose: boolean;
  setIsClose: React.Dispatch<React.SetStateAction<boolean>>;
  CheckState: () => void;
}
