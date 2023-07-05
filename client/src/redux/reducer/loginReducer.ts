import { createSlice } from '@reduxjs/toolkit';

type State = {
  accessToken: string;
};

const loginReducer = createSlice({
  name: 'loginReducer',
  initialState: {
    accessToken: '',
  },
  reducers: {
    setAccessToken(state: State, action) {
      return { ...state, accessToken: action.payload };
    },
  },
});

export const { setAccessToken } = loginReducer.actions;
export default loginReducer.reducer;
