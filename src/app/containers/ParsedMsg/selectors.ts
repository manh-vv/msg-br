import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.parsedMsg || initialState;

export const selectParsedMsg = createSelector(
  [selectDomain],
  parsedMsgState => parsedMsgState.parsedMsg,
);
