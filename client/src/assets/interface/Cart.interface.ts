export interface CartItem {
  cartId: number;
  productImagePath: string;
  productName: string;
  productCount: number;
  productPrice: number;
}

export interface CartItemProps {
  items: CartItem;
  idx: number;
  initialChecked: boolean;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}
