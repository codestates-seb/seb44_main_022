import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './loginReducer';

const reducer = combineReducers({
  loginReducer,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
