import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './user';

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
