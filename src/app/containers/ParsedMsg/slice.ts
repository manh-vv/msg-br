import { PayloadAction } from '@reduxjs/toolkit';
import { MsgPart } from 'types/MsgPart';
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
    parseMessage(_, _action: PayloadAction<{ line: string; idx: number }>) {},
    spellNumber(_, _action: PayloadAction<{ line: string; idx: number }>) {},
    parsedMsg(state, action: PayloadAction<MsgPartContainer>) {
      state.parsedMsg = action.payload;
    },
    addMsgPart(state, action: PayloadAction<{ msgPart: MsgPart; idx: number }>) {
      const { msgPart, idx } = action.payload;

      state.parsedMsg.msgParts = [
        ...state.parsedMsg.msgParts.slice(0, idx),
        msgPart,
        ...state.parsedMsg.msgParts.slice(idx + 1),
      ];

      if (msgPart.parts.length > state.parsedMsg.maxCol) {
        state.parsedMsg.maxCol = msgPart.parts.length;
      }

      msgPart.posVParts = msgPart.parts.filter(p => p.isPos || p.type === 'number');
      if (msgPart.posVParts.length > state.parsedMsg.maxPosCol) {
        state.parsedMsg.maxPosCol = msgPart.posVParts.length;
      }
    },
  },
});

export const { actions: parsedMsgActions, reducer, name: sliceKey } = parsedMsgSlice;
