import { createSlice } from '@reduxjs/toolkit';
import { CartItem } from '../../assets/interface/Cart.interface';

interface State {
  cartItemList: CartItem[];
}

const paymentReducer = createSlice({
  name: 'PaymentReducer',
  initialState: {
    cartItemList: [],
  },
  reducers: {
    addCartItemList(state: State, action) {
      state.cartItemList.push(action.payload);
    },
    removeCartItemList(state: State, action) {
      const index = state.cartItemList.findIndex((e) => e.cartId === action.payload.cartId);
      if (index > -1) {
        state.cartItemList.splice(index, 1);
      }
    },
  },
});

export const { addCartItemList, removeCartItemList } = paymentReducer.actions;
export default paymentReducer.reducer;
