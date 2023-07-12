import { AiOutlineCheckCircle, AiOutlineCreditCard, AiOutlineShoppingCart } from 'react-icons/ai';
import {
  CartCategory,
  CartCategoryArrow,
  CartCategoryContainer,
} from '../pages/order/ShoppingCart/ShoppingCart.style';
import { CartCategoryListProps } from '../assets/interface/Cart.interface';

function CartCategoryList({ category, pathname }: CartCategoryListProps) {
  const showIcon = (icon: string) => {
    if (icon === 'cart') return <AiOutlineShoppingCart />;
    if (icon === 'payment') return <AiOutlineCreditCard />;
    return <AiOutlineCheckCircle />;
  };

  return (
    <CartCategoryContainer key={category.path}>
      {showIcon(category.icon)}

      <CartCategory location={pathname === category.path}>{category.name}</CartCategory>
      {category.arrowDesign && <CartCategoryArrow>{'>'}</CartCategoryArrow>}
    </CartCategoryContainer>
  );
}

export default CartCategoryList;
