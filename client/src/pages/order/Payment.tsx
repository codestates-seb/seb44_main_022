import { useLocation } from 'react-router';

function Payment() {
  const { state } = useLocation();
  console.log(state);
  return <div></div>;
}

export default Payment;
