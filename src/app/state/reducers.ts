import { createReducer, on } from '@ngrx/store';

import { Layout, Theme } from '../models';

import { setLayout, setTheme } from './actions';

export const initialState = {
  layout: Layout.Grid,
  theme: Theme.Light
};

export const reducer = createReducer(
  initialState,
  on(setLayout, (state, { layout }) => ({ ...state, layout })),
  on(setTheme, (state, { theme }) => ({ ...state, theme }))
);
