import { createAction, props } from '@ngrx/store';

import { ActionTypes } from './actions.model';
import {
  DiscoverState,
  LayoutState,
  SelectedYearState,
  ThemeState
} from './reducers.model';

export const setDiscoverState = createAction(
  ActionTypes.SetDiscoverState,
  props<DiscoverState>()
);

export const setSelectedYear = createAction(
  ActionTypes.SetSelectedYear,
  props<SelectedYearState>()
);

export const setLayout = createAction(
  ActionTypes.SetLayout,
  props<LayoutState>()
);

export const setTheme = createAction(
  ActionTypes.SetTheme,
  props<ThemeState>()
);
