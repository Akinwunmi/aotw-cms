import { createReducer, on } from '@ngrx/store';

import { Layout, Theme } from '../models';

import { AppState } from './reducers.model';
import { setLayout, setTheme } from './actions';

export const initialState: AppState = {
  layout: Layout.Grid,
  theme: Theme.Light
};

export const appReducer = createReducer(
  initialState
);

export const layoutReducer = createReducer(
  initialState,
  on(setLayout, (state, { layout }) => ({ ...state, layout })),
  on(setTheme, (state, { theme }) => ({ ...state, theme }))
);
