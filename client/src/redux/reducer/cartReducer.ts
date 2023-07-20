import { createSlice } from '@reduxjs/toolkit';
import { CartReducerState } from '../../assets/interface/Cart.interface';

const cartReducer = createSlice({
  name: 'CartReducer',
  initialState: {
    idList: [],
  },
  reducers: {
    addCartIdList(state: CartReducerState, action) {
      state.idList.push(action.payload);
    },
    removeCartIdList(state: CartReducerState, action) {
      const index = state.idList.indexOf(action.payload);
      if (index > -1) {
        state.idList.splice(index, 1);
      }
    },
  },
});

export const { addCartIdList, removeCartIdList } = cartReducer.actions;
export default cartReducer.reducer;
