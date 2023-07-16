import { HamburgerMenuProps } from '../../assets/interface/Header.interface';
import { HamburgerMenuStyle } from './Header.style';

function HamburgerMenu({ isOpenMenu }: HamburgerMenuProps) {
  return (
    <HamburgerMenuStyle isOpenModal={isOpenMenu}>
      <span></span>
      <span></span>
      <span></span>
    </HamburgerMenuStyle>
  );
}

export default HamburgerMenu;
