import { useEffect, useState } from 'react';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { addCartIdList, removeCartIdList } from '../redux/reducer/cartReducer';

interface CartItemProps {
  id: number;
  initialChecked: boolean;
}

function CheckBox({ id, initialChecked }: CartItemProps) {
  const [isChecked, setIsChecked] = useState<boolean>(initialChecked);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isChecked) {
      dispatch(addCartIdList(id));
      return;
    }
    dispatch(removeCartIdList(id));
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
