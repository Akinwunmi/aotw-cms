import { createReducer, on } from '@ngrx/store';

import { SortDirection } from '../components/advanced-search';
import { Layout, Theme } from '../models';

import { setDiscoverState, setLayout, setTheme } from './actions';
import { AppState } from './reducers.model';

export const initialState: AppState = {
  discover: {
    filters: [],
    sorting: [],
    sortDirection: SortDirection.Asc,
    selectedYear: new Date().getFullYear()
  },
  layout: Layout.Grid,
  theme: Theme.Light
};

export const reducer = createReducer(
  initialState,
  on(setDiscoverState, (state, { filters, sorting, sortDirection, selectedYear }) => ({
    ...state,
    discover: { filters, sorting, sortDirection, selectedYear }
  })),
  on(setLayout, (state, { layout }) => ({ ...state, layout })),
  on(setTheme, (state, { theme }) => ({ ...state, theme }))
);
