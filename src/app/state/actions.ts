import { createAction, props } from '@ngrx/store';

import { Layout, Theme } from '../models';

import { ActionTypes } from './actions.model';

export const setLayout = createAction(
  ActionTypes.SetLayout,
  props<{ layout: Layout }>()
);

export const setTheme = createAction(
  ActionTypes.SetTheme,
  props<{ theme: Theme }>()
);
