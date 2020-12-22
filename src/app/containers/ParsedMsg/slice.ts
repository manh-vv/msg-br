import { PayloadAction } from '@reduxjs/toolkit';
import { MsgPartContainer } from 'types/MsgPartContainer';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the ParsedMsg container
export const initialState: ContainerState = {
  parsedMsg: {
    maxCol: 0,
    maxPosCol: 0,
    msgParts: [],
  },
};

const parsedMsgSlice = createSlice({
  name: 'parsedMsg',
  initialState,
  reducers: {
    parsedMsg(state, action: PayloadAction<MsgPartContainer>) {
      state.parsedMsg = action.payload;
    },
  },
});

export const { actions: parsedMsgActions, reducer, name: sliceKey } = parsedMsgSlice;
