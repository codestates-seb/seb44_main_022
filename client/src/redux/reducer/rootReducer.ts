import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './loginReducer';
import cartReducer from './cartReducer';

const reducer = combineReducers({
  loginReducer,
  cartReducer,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
