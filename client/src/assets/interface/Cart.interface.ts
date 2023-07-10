export interface CartItemTypes {
  cartId: number;
  productImagePath: string;
  productName: string;
  productCount: number;
  productPrice: number;
}

export interface CartItemProps {
  items: CartItemTypes;
  idx: number;
  initialChecked?: boolean;
  setTotalPrice?: React.Dispatch<React.SetStateAction<number>>;
}

export interface CartCheckProps {
  items: CartItemTypes;
  initialChecked: boolean;
}

export interface CartCategoryNameList {
  name: string;
  path: string;
  arrowDesign: boolean;
  icon: string;
}

export interface CartItemTabProps {
  path: string;
}

export interface CartCategoryListProps {
  category: CartCategoryNameList;
  pathname: string;
}

export interface PriceNumberProps {
  price: number;
  priceText: string;
}
