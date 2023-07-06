export interface CartItem {
  id: number;
  img: string;
  title: string;
  count: number;
  price: number;
}

export interface CartItemProps {
  items: CartItem;
  idx: number;
  initialChecked: boolean;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}
