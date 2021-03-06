import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.navbar || initialState;

export const selectNavbar = createSelector([selectDomain], navbarState => navbarState);
