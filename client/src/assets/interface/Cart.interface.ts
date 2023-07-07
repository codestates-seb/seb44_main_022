export interface CartItemType {
  cartId: number;
  productImagePath: string;
  productName: string;
  productCount: number;
  productPrice: number;
}

export interface CartItemProps {
  items: CartItemType;
  idx: number;
  initialChecked?: boolean;
  setTotalPrice?: React.Dispatch<React.SetStateAction<number>>;
}

export interface CartCheckProps {
  items: CartItemType;
  initialChecked: boolean;
}
