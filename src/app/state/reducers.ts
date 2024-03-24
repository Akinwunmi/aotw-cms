import { createReducer, on } from '@ngrx/store';

import { SortDirection } from '../components/advanced-search';
import { Layout, Theme } from '../models';

import { setDiscoverState, setLayout, setSelectedYear, setTheme } from './actions';
import { AppState } from './reducers.model';

export const initialState: AppState = {
  discover: {
    activeTopicId: '', // TODO: Assign and check in Discover component on init
    filters: [],
    sorting: [],
    sortDirection: SortDirection.Asc
  },
  layout: Layout.Grid,
  search: {
    filters: [],
    sorting: [],
    sortDirection: SortDirection.Asc
  },
  selectedYear: new Date().getFullYear(),
  theme: Theme.Light
};

export const reducer = createReducer(
  initialState,
  on(setDiscoverState, (
    state,
    { activeTopicId, filters, sorting, sortDirection }
  ) => {
    return {
      ...state,
      discover: { activeTopicId, filters, sorting, sortDirection }
    };
  }),
  on(setLayout, (state, { layout }) => ({ ...state, layout })),
  on(setSelectedYear, (state, { selectedYear }) => ({ ...state, selectedYear })),
  on(setTheme, (state, { theme }) => ({ ...state, theme }))
);
