import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducer/rootReducer';

const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>;

export default store;
