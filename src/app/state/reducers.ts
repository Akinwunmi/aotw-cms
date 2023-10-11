import { createReducer, on } from '@ngrx/store';

import { SortDirection } from '../components/advanced-search';
import { Layout, Theme } from '../models';

import { setDiscoverState, setLayout, setTheme } from './actions';
import { AppState } from './reducers.model';

export const initialState: AppState = {
  discover: {
    filters: [],
    sorting: [],
    sortDirection: SortDirection.Asc
  },
  layout: Layout.Grid,
  theme: Theme.Light
};

export const reducer = createReducer(
  initialState,
  on(setDiscoverState, (state, { filters, sorting, sortDirection }) => ({
    ...state,
    discover: { filters, sorting, sortDirection }
  })),
  on(setLayout, (state, { layout }) => ({ ...state, layout })),
  on(setTheme, (state, { theme }) => ({ ...state, theme }))
);
