import { CartItemTypes, RspData } from './Cart.interface';

export interface PaymentWindowParams {
  orderUserName: string;
  shippingAddress: string;
  cartList: CartItemTypes[];
  onSuccess: () => void;
}

export interface ImpParams {
  pg: string;
  pay_method: string;
  merchant_uid: string;
  name: string;
  amount: number;
  buyer_email: string;
  buyer_name: string;
  buyer_addr: string;
}

export interface ImpType {
  init: (shopUID: string) => void;
  request_pay: (params: ImpParams, callback: (res: RspData) => void) => void;
}
