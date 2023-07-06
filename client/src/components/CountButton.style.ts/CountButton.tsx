import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs';
import { DownBtn } from './CountButton.style';
interface CountProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}

function CountButton({ count, setCount, setTotalPrice }: CountProps) {
  const handleDownCount = () => {
    if (count > 1) {
      setCount(count - 1);
      setTotalPrice(count + 1);
      return;
    }
    alert('수량은 1 이하로 내릴 수 없습니다.');
  };

  const handleUpCount = () => {
    if (count < 99) {
      setCount(count + 1);
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
