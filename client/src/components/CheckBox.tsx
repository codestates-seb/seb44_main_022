import { useEffect, useState } from 'react';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { addCartIdList, removeCartIdList } from '../redux/reducer/cartReducer';
import { CartCheckProps } from '../assets/interface/Cart.interface';

function CheckBox({ items, initialChecked }: CartCheckProps) {
  const [isChecked, setIsChecked] = useState<boolean>(initialChecked);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isChecked) {
      dispatch(addCartIdList(items.cartId));
      return;
    }
    dispatch(removeCartIdList(items.cartId));
    return;
  }, [isChecked]);

  useEffect(() => {
    setIsChecked(initialChecked);
  }, [initialChecked]);

  return (
    <>
      {isChecked ? (
        <MdCheckBox onClick={() => setIsChecked(!isChecked)} />
      ) : (
        <MdCheckBoxOutlineBlank onClick={() => setIsChecked(!isChecked)} />
      )}
    </>
  );
}

export default CheckBox;
