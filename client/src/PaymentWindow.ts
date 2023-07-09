import { CartItemType } from './assets/interface/Cart.interface';

const IMP = window.IMP;
IMP.init('imp67011510');

const today = new Date();
const hours = today.getHours(); // 시
const minutes = today.getMinutes(); // 분
const seconds = today.getSeconds(); // 초
const milliseconds = today.getMilliseconds();
const makeMerchantUid = hours + minutes + seconds + milliseconds;
console.log(makeMerchantUid);

export function requestPay(
  orderUserName: string,
  shippingAddress: string,
  cartList: CartItemType[],
  onSuccess: () => void
) {
  const itemsName = cartList.map((item) => item.productName).join(',');
  const totalAmount = cartList.reduce(
    (acc, item) => acc + item.productCount * item.productPrice,
    0
  );

  // const navigate = useNavigate();
  IMP.request_pay(
    {
      pg: 'kcp',
      pay_method: 'card',
      merchant_uid: 'IMP' + makeMerchantUid,
      name: itemsName,
      amount: totalAmount + 3500,
      buyer_email: 'Iamport@chai.finance',
      buyer_name: orderUserName,
      buyer_addr: shippingAddress,
    },
    function (rsp: { [x: string]: any; success: any }) {
      // callback
      if (rsp.success) {
        onSuccess();
        // navigate('/complete', { state: { rightPass: true } });
      } else {
        alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
      }
    }
  );
}
