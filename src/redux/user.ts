import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../types/types';

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: { isLogined: false } as Partial<IUser>,
  reducers: {
    setUser: (_state, { payload }: PayloadAction<Partial<IUser>>) => payload,
  },
});

export const { setUser } = userSlice.actions;
