import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.originalMsg || initialState;

export const selectOriginalMsg = createSelector(
  [selectDomain],
  originalMsgState => originalMsgState,
);
export const selectOriginMsg = createSelector(selectOriginalMsg, state => state.originMsg);
