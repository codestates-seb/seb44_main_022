import { HamburgerMenuStyle } from './Header.style';

interface HamburgerMenuProps {
  isOpenMenu: boolean;
}
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
