import { createReducer, on } from '@ngrx/store';

import { Layout, Theme } from '../models';

import { setDiscoverState, setLayout, setTheme } from './actions';
import { AppState } from './reducers.model';

export const initialState: AppState = {
  discover: {
    filters: [],
    sorting: []
  },
  layout: Layout.Grid,
  theme: Theme.Light
};

export const reducer = createReducer(
  initialState,
  on(setDiscoverState, (state, { filters, sorting }) => ({
    ...state,
    discover: { filters, sorting }
  })),
  on(setLayout, (state, { layout }) => ({ ...state, layout })),
  on(setTheme, (state, { theme }) => ({ ...state, theme }))
);
