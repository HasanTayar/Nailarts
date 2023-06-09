import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';

const store = configureStore({
  reducer: { auth: authSlice },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: true }),

});

export type RootState = ReturnType<typeof store.getState>;

// Define a custom AppDispatch type that includes thunk actions
export type AppDispatch = typeof store.dispatch;

export default store;
