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

export const selectTheme = createSelector(
  state,
  state => state.theme
);
