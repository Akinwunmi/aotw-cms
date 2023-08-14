import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Layout, Theme } from '../models';

import { AppState } from './reducers.model';

const selectAppState = createFeatureSelector<AppState>('app');

const selectLayout = (state: AppState) => state.layout;
const selectTheme = (state: AppState) => state.theme;

export const selectActiveLayout = createSelector(
  selectAppState,
  selectLayout
);

export const selectActiveTheme = createSelector(
  selectAppState,
  selectTheme
);
