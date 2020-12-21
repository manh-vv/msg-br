import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the ParsedMsg container
export const initialState: ContainerState = {
  parsedMsg: [],
};

const parsedMsgSlice = createSlice({
  name: 'parsedMsg',
  initialState,
  reducers: {
    parsedMsg(state, action: PayloadAction<any[]>) {
      state.parsedMsg = action.payload;
    },
  },
});

export const { actions: parsedMsgActions, reducer, name: sliceKey } = parsedMsgSlice;
