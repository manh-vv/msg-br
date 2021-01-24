import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the Navbar container
export const initialState: ContainerState = {};

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
  },
});

export const { actions: navbarActions, reducer, name: sliceKey } = navbarSlice;
