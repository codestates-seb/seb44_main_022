import { CartItemTypes } from '../../../assets/interface/Cart.interface';
import { postAfterPayment } from '../../../api/orderApis';
import { ImpType, PaymentWindowParams } from '../../../assets/interface/Payment.interface';

declare global {
  interface Window {
    IMP: ImpType;
  }
}

const { IMP } = window;
IMP.init('imp04163177');

const makeMerchantUid = () => {
  const today = new Date();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  const milliseconds = today.getMilliseconds();

  return hours + minutes + seconds + milliseconds;
};

export function requestPay(params: PaymentWindowParams) {
  const { orderUserName, shippingAddress, cartList, onSuccess } = params;
  const itemsName = cartList.map((item) => item.productName).join(',');
  const idList = cartList.map((item) => item.cartId);
  const totalAmount = (cartList: CartItemTypes[]) => {
    return cartList.reduce((acc, item) => acc + item.productCount * item.productPrice, 0) + 3500;
  };

  IMP.request_pay(
    {
      pg: 'kakaopay.TC0ONETIME',
      pay_method: 'card',
      merchant_uid: 'IMP' + makeMerchantUid(),
      name: itemsName,
      amount: totalAmount(cartList),
      buyer_email: 'Iamport@chai.finance',
      buyer_name: orderUserName,
      buyer_addr: shippingAddress,
    },
    (res) => {
      const { success, imp_uid, error_msg } = res;
      if (success) {
        postAfterPayment(idList, imp_uid, orderUserName, shippingAddress)
          .then(() => {
            alert('결제 성공');
            onSuccess();
          })
          .catch((err) => alert(`결제에 실패하였습니다. 에러 내용: ${err}`));
      } else {
        if (error_msg === '이미 결제가 이루어진 거래건입니다.') alert('잠시 후 다시 시도해주세요.');
        else {
          alert(`결제에 실패하였습니다. 에러 내용: ${error_msg}`);
        }
      }
    }
  );
}
