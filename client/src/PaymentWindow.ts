import { CartItemTypes } from './assets/interface/Cart.interface';
import { postAfterPayment } from './api/orderApis';

const IMP = window.IMP;
IMP.init('imp67011510');

const makeMerchantUid = () => {
  const today = new Date();
  const hours = today.getHours(); // 시
  const minutes = today.getMinutes(); // 분
  const seconds = today.getSeconds(); // 초
  const milliseconds = today.getMilliseconds();

  return hours + minutes + seconds + milliseconds;
};

interface RspData {
  success: boolean;
  error_msg: string;
  imp_uid: string;
}

export function requestPay(
  orderUserName: string,
  shippingAddress: string,
  cartList: CartItemTypes[],
  onSuccess: () => void
) {
  const itemsName = cartList.map((item) => item.productName).join(',');
  const idList = cartList.map((item) => item.cartId);
  const totalAmount = (cartList: CartItemTypes[]) => {
    return cartList.reduce((acc, item) => acc + item.productCount * item.productPrice, 0) + 3500;
  };

  IMP.request_pay(
    {
      pg: 'kcp',
      pay_method: 'card',
      merchant_uid: 'IMP' + makeMerchantUid(),
      name: itemsName,
      amount: totalAmount(cartList),
      buyer_email: 'Iamport@chai.finance',
      buyer_name: orderUserName,
      buyer_addr: shippingAddress,
    },
    (rsp: RspData) => {
      if (rsp.success) {
        postAfterPayment(idList, rsp.imp_uid)
          .then((res) => {
            console.log(res);
            onSuccess();
          })
          .catch((err) => alert(`결제에 실패하였습니다. 에러 내용: ${err}`));
      } else {
        if (rsp.error_msg === '이미 결제가 이루어진 거래건입니다.')
          alert('잠시 후 다시 시도해주세요.');
        else {
          alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
        }
      }
    }
  );
}
