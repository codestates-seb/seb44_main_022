import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs';
import { patchProductCount } from '../../api/orderApis';
import { CountButtonProps } from '../../assets/interface/Button.interface';
import { DownBtn } from './CountButton.style';

function CountButton({ id, count, setCount, setTotalPrice }: CountButtonProps) {
  const handleDownCount = () => {
    if (count > 1) {
      setCount(count - 1);
      patchProductCount(id, count - 1)
        .then((res) => setTotalPrice(res.data.totalPrice))
        .catch((err) => console.log(err));

      return;
    }
    alert('수량은 1 이하로 내릴 수 없습니다.');
  };

  const handleUpCount = () => {
    if (count < 99) {
      setCount(count + 1);

      patchProductCount(id, count + 1)
        .then((res) => setTotalPrice(res.data.totalPrice))
        .catch((err) => console.log(err));

      return;
    }
    alert('수량은 99개 이상으로 올릴 수 없습니다.');
  };

  return (
    <>
      <DownBtn as={BsArrowDownCircle} onClick={handleDownCount} />
      {count}
      <DownBtn as={BsArrowUpCircle} onClick={handleUpCount} />
    </>
  );
}

export default CountButton;
