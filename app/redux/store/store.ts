'use client'
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import UserReducer from '../slice/user';

export const store = configureStore({
  reducer: {
     user: UserReducer,
  },
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
