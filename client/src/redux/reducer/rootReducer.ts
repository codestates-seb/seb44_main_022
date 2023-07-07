import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './loginReducer';
import cartReducer from './cartReducer';
import paymentReducer from './paymentReducer';

const reducer = combineReducers({
  loginReducer,
  cartReducer,
  paymentReducer,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
