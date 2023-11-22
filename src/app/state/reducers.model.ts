import {
  FilterOption,
  SortDirection,
  SortOption
} from '../components/advanced-search';
import { Layout, Theme } from '../models';

export interface AppState {
  discover: DiscoverState,
  layout: Layout;
  selectedYear: number;
  theme: Theme;
}

export interface DiscoverState {
  activeTopicId: string;
  filters: FilterOption[];
  sorting: SortOption[];
  sortDirection: SortDirection;
}

export type LayoutState = Pick<AppState, 'layout'>;

export type SelectedYearState = Pick<AppState, 'selectedYear'>;

export type ThemeState = Pick<AppState, 'theme'>;
