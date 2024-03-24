import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from './reducers.model';

export const state = createFeatureSelector<AppState>('app');

export const selectDiscover = createSelector(
  state,
  state => state.discover
);

export const selectLayout = createSelector(
  state,
  state => state.layout
);

export const selectSelectedYear = createSelector(
  state,
  state => state.selectedYear
);

export const selectSearch = createSelector(
  state,
  state => state.search
);

export const selectTheme = createSelector(
  state,
  state => state.theme
);
