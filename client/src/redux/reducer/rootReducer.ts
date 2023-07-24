import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartReducer';

const reducer = combineReducers({
  cartReducer,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
