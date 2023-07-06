import { createSlice } from '@reduxjs/toolkit';

type State = {
  idList: number[];
};

const cartReducer = createSlice({
  name: 'CartReducer',
  initialState: {
    idList: [],
  },
  reducers: {
    addCartIdList(state: State, action) {
      state.idList.push(action.payload);
    },
    removeCartIdList(state: State, action) {
      const index = state.idList.indexOf(action.payload);
      if (index > -1) {
        state.idList.splice(index, 1);
      }
    },
  },
});

export const { addCartIdList, removeCartIdList } = cartReducer.actions;
export default cartReducer.reducer;
