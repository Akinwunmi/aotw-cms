import { createAction, props } from '@ngrx/store';

import {
  FilterOption,
  SortDirection,
  SortOption
} from '../components/filters-and-sorting';
import { Layout, Theme } from '../models';

import { ActionTypes } from './actions.model';

export const setDiscoverState = createAction(
  ActionTypes.SetDiscoverState,
  props<{
    filters: FilterOption[],
    sorting: SortOption[],
    sortDirection: SortDirection
  }>()
);

export const setLayout = createAction(
  ActionTypes.SetLayout,
  props<{ layout: Layout }>()
);

export const setTheme = createAction(
  ActionTypes.SetTheme,
  props<{ theme: Theme }>()
);
