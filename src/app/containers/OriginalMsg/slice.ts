import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the OriginalMsg container
export const initialState: ContainerState = {
  originMsg: '',
};

const originalMsgSlice = createSlice({
  name: 'originalMsg',
  initialState,
  reducers: {
    updateOriginMsg(state, action: PayloadAction<string>) {
      state.originMsg = action.payload;
    },
  },
});

export const { actions: originalMsgActions, reducer, name: sliceKey } = originalMsgSlice;
